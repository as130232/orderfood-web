import { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import Store from "./components/Store"
import Group from "./components/Group"
import GroupNav from "./components/GroupNav"
import { API_GET_STORE } from '../../global/constants'
import { Grid, Typography, Zoom, Fab, Box, Stack, Button, useScrollTrigger } from '@mui/material'
import { chooseStore } from '../../redux/Ordering/OrderingActions'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import PrimarySearchAppBar from "../../components/PrimarySearchAppBar"
import { connect } from 'react-redux'
import { useLiff } from 'react-liff'
import { FONT_COLOR } from '../../global/globalStyle'

const getStoreInfo = async (setStore, setGroupMenu, storeCode) => {
    let url = API_GET_STORE.replace(":storeCode", storeCode)
    const storeData = await fetch(url).then(res => res.json()).then(res => res.data).catch(err => console.log(err))
    // const storeData = await axios.get(API_GET_STORE).then(res => res.data).then(res => res.data)
    document.title = storeData.name
    setStore(storeData)
    setGroupMenu(storeData.groups)
}

const Menu = ({ props, cart, chooseStore }) => {
    const { liff, isLoggedIn, ready, error } = useLiff()
    const { storeCode } = useParams()
    const [store, setStore] = useState({
        code: 0,
        name: "查無店家"
    })
    const [groupMenu, setGroupMenu] = useState([])
    const [groupInView, setGroupInView] = useState(0) // 現在滑行到哪一個group
    useEffect(() => {
        getStoreInfo(setStore, setGroupMenu, storeCode)
    }, [storeCode])
    chooseStore(store.code, store.openTime, store.closedTime)

    let history = useHistory()
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
            <Grid container
                justifyContent="center"
                alignItems="center"
                sx={{ position: 'fixed', bottom: 0, height: 55, width: '100%', bgcolor: 'primary.contrastText' }}>
                {/* <Box
                sx={{ position: 'fixed', bottom: 0, height: 50, width: '100%', bgcolor: 'primary.contrastText' }}> */}
                <Button
                    size="large" variant="contained" sx={{ backgroundColor: FONT_COLOR.ORANGE, borderRadius: '12px' }}

                    onClick={() => {
                        history.push("/cart")
                    }}>
                    <Stack
                        direction="row"
                        spacing={10}
                        justifyContent="center"
                        alignItems="center">
                        <Typography variant="h7"> {totalCount}</Typography>
                        <Typography variant="h7"> 購物車</Typography>
                        <Typography variant="h7"> $ {totalPrice} </Typography>
                    </Stack>
                </Button>
            </Grid>
    }


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
                    sx={{ position: 'fixed', bottom: cart.length > 0 ? 60 : 20, right: 16, }}
                >
                    {children}
                </Box>
            </Zoom>
        );
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
                <Fab sx={{ color: FONT_COLOR.ORANGE }} size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
            {cartComponent}

        </div>
    )
}
const mapStateToProps = state => {
    return {
        cart: state.order.cart,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        chooseStore: (storeCode, openTime, closedTime) => dispatch(chooseStore(storeCode, openTime, closedTime)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Menu)
