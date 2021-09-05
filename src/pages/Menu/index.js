import Store from "./components/Store";
import Group from "./components/Group";
import { useState, useEffect } from "react";

const Menu = () => {
  const storeData = {
    name: "木魚廚房",
    evaluation: "4.9(500+)",
    delivery: "30",
  };
  const [store, setStore] = useState(storeData);

  const groupMenuData = [
    {
      id: 1,
      name: "主食",
      items: [
        {
          name: "水煮嫩雞胸餐",
          note: "含營養米飯、水煮蛋、雞胸肉、青菜",
          price: 100,
        },
        {
          name: "火烤雞胸餐",
          note: "含營養米飯、水煮蛋、雞胸肉、青菜",
          price: 110,
        },
      ],
    },
    {
      id: 2,
      name: "飲料",
      items: [
        {
          name: "蘋果奇異果汁",
          note: "含蘋果、奇異果",
          price: 70,
        },
        {
          name: "香蕉牛奶",
          note: "含香蕉、牛奶",
          price: 55,
        },
      ],
    },
  ];
  const [groupMenu, setGroupMenu] = useState(groupMenuData);

  // useEffect(() => {
  // }, [])

  return (
    <div>
      <Store storeDate={store} />
      ---------------
      <Group groupMenuData={groupMenu} />
    </div>
  );
};

export default Menu;
