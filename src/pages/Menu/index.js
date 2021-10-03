import Store from "./components/Store"
import Group from "./components/Group"
import GroupNav from "./components/GroupNav"
import { useState, useEffect } from "react"
import { API_GET_STORE } from '../../global/constants'
// import axios from 'axios'
import { useLocation } from "react-router-dom"
import { Drawer } from '@material-ui/core'

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
            <Drawer anchor='right' open={cartOpen} onClose={() => { setCartOpen(false) }} >
                購物車
            </Drawer>
            <Store store={store} />
            <GroupNav groupMenuData={groupMenu}></GroupNav>
            <Group groupMenuData={groupMenu} />
        </div>
    )
}

export default Menu;
