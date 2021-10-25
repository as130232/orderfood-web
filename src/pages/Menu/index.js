import { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import Store from "./components/Store"
import Group from "./components/Group"
import GroupNav from "./components/GroupNav"
import { API_GET_STORE } from '../../global/constants'
import { IconButton, AppBar, Toolbar, Typography, Zoom, Fab, Box, Stack, Button, useScrollTrigger } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import PrimarySearchAppBar from "../../components/PrimarySearchAppBar"
import { connect } from 'react-redux'

const getStoreInfo = async (setStore, setGroupMenu, storeCode) => {
    let url = API_GET_STORE.replace(":storeCode", storeCode)
    const storeData = await fetch(url).then(res => res.json()).then(res => res.data).catch(err => console.log(err))
    // const storeData = await axios.get(API_GET_STORE).then(res => res.data).then(res => res.data)
    document.title = storeData.name
    setStore(storeData)
    setGroupMenu(storeData.groups)
}

const Menu = ({ props, cart }) => {
    const { storeCode } = useParams();
    const [store, setStore] = useState({
        code: 0,
        name: "查無店家"
    })
    const [groupMenu, setGroupMenu] = useState([])
    const [groupInView, setGroupInView] = useState(0) // 現在滑行到哪一個group

    useEffect(() => {
        getStoreInfo(setStore, setGroupMenu, storeCode);
    }, [])

    let history = useHistory();
    let cartComponent = null
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    useEffect(() => {
        let price = 0
        let count = 0
        cart.forEach(item => {
            count += item.qty
            price += item.qty * (item.price + item.selections.reduce((prev, cur) => { return prev + cur.price }, 0))
        })
        setTotalPrice(price)
        setTotalCount(count)
    }, [cart, totalPrice, totalCount, setTotalPrice, setTotalCount])
    if (cart.length !== 0) {
        cartComponent =
            <Box 
                // role="presentation"
                sx={{ p:2, position: 'fixed', bottom: 0, width: '100%', height: 50, bgcolor: 'primary.dark', }}
                onClick={() => {
                    history.push("/cart")
                }}
                component="span"
                 >
                <Stack direction="row" spacing={3} justifyContent="center" alignItems="center">
                    <Typography variant="h6"> {totalCount}　購物車　${totalPrice} </Typography>
                </Stack>
            </Box>
    }

    return (
        <div >
            <div id="back-to-top-anchor" />
            <PrimarySearchAppBar></PrimarySearchAppBar>
            <Store store={store} />
            <GroupNav groupMenuData={groupMenu} groupInView={groupInView}></GroupNav>
            <Group groupMenuData={groupMenu} updateGroupInView={groupIndex => {
                setGroupInView(groupIndex)
            }} />

            <ScrollTop {...props}>
                <Fab color="secondary" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
            {cartComponent}

        </div>
    )
}
const mapStateToProps = state => {
    return {
        cart: state.order.cart
    }
}
export default connect(mapStateToProps)(Menu)

function ScrollTop(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector(
            '#back-to-top-anchor',
        );

        if (anchor) {
            anchor.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    };

    return (
        <Zoom in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: 'fixed', bottom: 60, right: 16 }}
            >
                {children}
            </Box>
        </Zoom>
    );
}