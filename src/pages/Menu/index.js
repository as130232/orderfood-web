import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useLiff } from 'react-liff'
import Store from "./components/Store"
import Group from "./components/Group"
import GroupNav from "./components/GroupNav"
import { API_GET_STORE } from '../../global/constants'
import { IconButton, AppBar, Toolbar, StyledFab, Box, Typography } from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import "./index.css"

import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import PrimarySearchAppBar from "../../components/PrimarySearchAppBar"

const getStoreInfo = async (setStore, setGroupMenu, storeId) => {
    let url = API_GET_STORE.replace(":storeId", storeId)
    const storeData = await fetch(url).then(res => res.json()).then(res => res.data).catch(err => console.log(err))
    // const storeData = await axios.get(API_GET_STORE).then(res => res.data).then(res => res.data)
    setStore(storeData)
    setGroupMenu(storeData.groups)
}

const Menu = () => {
    const [lineProfile, setLineProfile] = useState('')
    const [displayName, setDisplayName] = useState('')
    const { error, liff, isLoggedIn, ready } = useLiff()
    useEffect(() => {
        if (!isLoggedIn) return;
        (async () => {
            const profile = await liff.getProfile();
            setDisplayName(profile.displayName)
            setLineProfile(profile)
        })()
    }, [liff, isLoggedIn])

    const showDisplayName = () => {
        if (error) return <p>Something is wrong.</p>
        if (!ready) return <p>Loading...</p>
        if (!isLoggedIn) {
            return <button className="App-button" onClick={liff.login}>Login</button>
        }
        return (
            <>
                <p>Welcome to the react-liff demo app, {lineProfile.displayName}!</p>
                <button className="App-button" onClick={liff.logout}>Logout</button>
            </>
        );
    }

    const search = useLocation().search
    const storeId = new URLSearchParams(search).get("storeId")

    const [store, setStore] = useState({})
    const [groupMenu, setGroupMenu] = useState([])

    const [cartOpen, setCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        getStoreInfo(setStore, setGroupMenu, storeId);
    }, [])

    return (
        <div>
            <PrimarySearchAppBar></PrimarySearchAppBar>
            <Store store={store} />
            <GroupNav groupMenuData={groupMenu}></GroupNav>
            <Group groupMenuData={groupMenu} />

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
            <div className="App">
                <header className="App-header">你好{showDisplayName()}</header>
            </div>
        </div>
    )
}

export default Menu;
