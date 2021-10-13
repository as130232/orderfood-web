import { Box, Grid } from '@material-ui/core';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
const Store = ({ store }) => {
  return (
      <Grid>
        <Box>
          {/* <Image src="https://hsinchu.lakeshore.com.tw/wp-content/uploads/sites/12/2020/08/hs_mwr_gallery_3.jpg" fluid rounded /> */}
        </Box>
        <h1>{store && store.name}</h1>
        <p><StarRoundedIcon color="secondary"></StarRoundedIcon>{store && store.rating}</p>
      </Grid>
  );
};
export default Store;
