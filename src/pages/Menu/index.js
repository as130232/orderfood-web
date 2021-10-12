import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useLiff } from 'react-liff'
import Store from "./components/Store"
import Group from "./components/Group"
import GroupNav from "./components/GroupNav"
import { API_GET_STORE } from '../../global/constants'
import { IconButton, AppBar, Toolbar, Typography, Zoom, Fab, Box, useScrollTrigger } from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import "./index.css"
// import { makeStyles } from "@material-ui/core/styles";
// import { useTheme } from "@material-ui/core/styles";
import PrimarySearchAppBar from "../../components/PrimarySearchAppBar"
import PropTypes from 'prop-types';

const getStoreInfo = async (setStore, setGroupMenu, storeId) => {
    let url = API_GET_STORE.replace(":storeId", storeId)
    const storeData = await fetch(url).then(res => res.json()).then(res => res.data).catch(err => console.log(err))
    // const storeData = await axios.get(API_GET_STORE).then(res => res.data).then(res => res.data)
    document.title = storeData.name
    setStore(storeData)
    setGroupMenu(storeData.groups)
}

const Menu = (props) => {
    const [lineProfile, setLineProfile] = useState('')
    const { error, liff, isLoggedIn, ready } = useLiff()
    useEffect(() => {
        if (!isLoggedIn) return;
        (async () => {
            const profile = await liff.getProfile();
            setLineProfile(profile)
        })()
    }, [liff, isLoggedIn])

    // const showDisplayName = () => {
    //     if (error) return <p>Something is wrong.</p>
    //     if (!ready) return <p>Loading...</p>
    //     if (!isLoggedIn) {
    //         return <button className="App-button" onClick={liff.login}>Login</button>
    //     }
    //     return (
    //         <>
    //             <p>Welcome to the react-liff demo app, {lineProfile.displayName}!</p>
    //             <button className="App-button" onClick={liff.logout}>Logout</button>
    //         </>
    //     );
    // }

    const storeId = new URLSearchParams(useLocation().search).get("storeId")
    const [store, setStore] = useState({})
    const [groupMenu, setGroupMenu] = useState([])

    useEffect(() => {
        getStoreInfo(setStore, setGroupMenu, storeId);
    }, [])

    return (
        <div>
            <PrimarySearchAppBar></PrimarySearchAppBar>
            <Store store={store} />
            <GroupNav groupMenuData={groupMenu}></GroupNav>
            <Group groupMenuData={groupMenu} />

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