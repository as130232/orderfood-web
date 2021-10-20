import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Store from "./components/Store"
import Group from "./components/Group"
import GroupNav from "./components/GroupNav"
import { API_GET_STORE } from '../../global/constants'
import { IconButton, AppBar, Toolbar, Typography, Zoom, Fab, Box, useScrollTrigger } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

import PrimarySearchAppBar from "../../components/PrimarySearchAppBar"

const getStoreInfo = async (setStore, setGroupMenu, storeCode) => {
    let url = API_GET_STORE.replace(":storeCode", storeCode)
    const storeData = await fetch(url).then(res => res.json()).then(res => res.data).catch(err => console.log(err))
    // const storeData = await axios.get(API_GET_STORE).then(res => res.data).then(res => res.data)
    document.title = storeData.name
    setStore(storeData)
    setGroupMenu(storeData.groups)
}

const Menu = (props) => {
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

            <AppBar position="static" style={{ backgroundColor: "#F28A30" }} sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <ShoppingCartIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        購物車
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}
export default Menu;

function ScrollTop(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
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
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
            >
                {children}
            </Box>
        </Zoom>
    );
}