import Store from "./components/Store"
import Group from "./components/Group"
import GroupNav from "./components/GroupNav"
import { useState, useEffect } from "react"
import { API_GET_STORE } from '../../global/constants'
import axios from 'axios'

async function fetchStoreAndMenu(setStore, setGroupMenu) {
    const storeData = await fetch(API_GET_STORE).then(res => res.json()).then(res => res.data)
    // const storeData = await axios.get(API_GET_STORE).then(res => res.data).then(res => res.data)
    console.log(storeData);
    setStore(storeData)
    setGroupMenu(storeData.groups)
}

const Menu = () => {
    const [store, setStore] = useState({});
    const [groupMenu, setGroupMenu] = useState([])

    useEffect(() => {
        fetchStoreAndMenu(setStore, setGroupMenu);
    }, [])

    return (
        <div>
            <Store storeDate={store} />
            ---------------
            <GroupNav groupMenuData={groupMenu}></GroupNav>
            <Group groupMenuData={groupMenu} />
        </div>
    );
};

export default Menu;
