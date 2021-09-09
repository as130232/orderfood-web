import { Image } from 'react-bootstrap'
const Store = ({ storeDate }) => {
  return (
    // <AppBar position="sticky" color="default">
      
    // </AppBar>
    <div>
      <Image src="https://hsinchu.lakeshore.com.tw/wp-content/uploads/sites/12/2020/08/hs_mwr_gallery_3.jpg" fluid rounded />
      <h1>{storeDate.name}</h1>
      <p>★{storeDate.rating}</p>
      <p>外送 {storeDate.deliveryTime} 分鐘</p>
    </div>
  );
};

export default Store;
