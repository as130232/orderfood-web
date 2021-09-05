import Store from "./components/Store"
import Group from "./components/Group"
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
    // const storeData = {
    //     name: "木魚廚房",
    //     evaluation: "4.9(500+)",
    //     delivery: "30",
    // };
    // const groupMenuData = [
    //     {
    //         id: 1,
    //         name: "主食",
    //         items: [
    //             {
    //                 id:100,
    //                 name: "水煮嫩雞胸餐",
    //                 note: "含營養米飯、水煮蛋、雞胸肉、青菜",
    //                 price: 100,
    //             },
    //             {
    //                 id:101,
    //                 name: "火烤雞胸餐",
    //                 note: "含營養米飯、水煮蛋、雞胸肉、青菜",
    //                 price: 110,
    //             },
    //         ],
    //     },
    //     {
    //         id: 2,
    //         name: "飲料",
    //         items: [
    //             {
    //                 id:102,
    //                 name: "蘋果奇異果汁",
    //                 note: "含蘋果、奇異果",
    //                 price: 70,
    //             },
    //             {
    //                 id:103,
    //                 name: "香蕉牛奶",
    //                 note: "含香蕉、牛奶",
    //                 price: 55,
    //             },
    //         ],
    //     },
    // ];

    const [store, setStore] = useState({});
    const [groupMenu, setGroupMenu] = useState([])

    useEffect(() => {
        fetchStoreAndMenu(setStore, setGroupMenu);
    }, [])

    return (
        <div>
            <Store storeDate={store} />
            ---------------
      <Group groupMenuData={groupMenu} />
        </div>
    );
};

export default Menu;
