import { Image } from 'react-bootstrap'

import { Box } from '@material-ui/core';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
const Store = ({ storeDate }) => {
  return (
    // <AppBar position="sticky" color="default">

    // </AppBar>
    <div>
      <Box>
        <Image src="https://hsinchu.lakeshore.com.tw/wp-content/uploads/sites/12/2020/08/hs_mwr_gallery_3.jpg" fluid rounded />
      </Box>
      <h1>{storeDate.name}</h1>
      {storeDate.rating}
      <p><StarRoundedIcon color="secondary"></StarRoundedIcon>{storeDate.rating}</p>
      <p>外送 {storeDate.deliveryTime} 分鐘</p>
    </div>
  );
};

export default Store;
