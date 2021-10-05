import Store from "./components/Store"
import Group from "./components/Group"
import GroupNav from "./components/GroupNav"
import { useState, useEffect } from "react"
import { API_GET_STORE } from '../../global/constants'
// import axios from 'axios'
import { useLocation } from "react-router-dom"
import { Drawer, BottomAppBar, IconButton, AppBar, Toolbar, StyledFab, Box, Typography } from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import "./index.css";


const StoreIdByUrl = () => {
    const search = useLocation().search
    return new URLSearchParams(search).get("storeId")
}

async function fetchStoreAndMenu(setStore, setGroupMenu, storeId) {
    let url = API_GET_STORE.replace(":storeId", storeId)
    const storeData = await fetch(url).then(res => res.json()).then(res => res.data).catch(err => console.log(err))
    // const storeData = await axios.get(API_GET_STORE).then(res => res.data).then(res => res.data)
    setStore(storeData)
    setGroupMenu(storeData.groups)
}

const Menu = () => {
    const storeId = StoreIdByUrl()
    const [store, setStore] = useState({})
    const [groupMenu, setGroupMenu] = useState([])

    const [cartOpen, setCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        fetchStoreAndMenu(setStore, setGroupMenu, storeId);
    }, [])

    return (
        <div>
            <Store store={store} />
            <GroupNav groupMenuData={groupMenu}></GroupNav>
            <Group groupMenuData={groupMenu} />

            <AppBar position="static" style={{ backgroundColor: "#F28A30" }}>
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
