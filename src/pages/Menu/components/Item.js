import { useHistory } from "react-router-dom"
import { connect } from 'react-redux'
import { styled } from '@material-ui/styles';
import { addToCart } from '../../../redux/Ordering/OrderingActions'
import { Box, Grid, ButtonBase, Typography, Paper } from '@material-ui/core'
import { FONT_COLOR } from '../../../global/constants'
const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});


const Item = ({ id, name, note, price, addToCart }) => {
  let history = useHistory();
  return (
    <Box sx={{ my: 1, mx: 0 }} sx={{ cursor: 'pointer' }}
      onClick={() => {
        history.push(`/store/meal/${id}`)
      }}>
      <Grid container item
        xs={12} sm={6} md={4} lg={3}
      // spacing={2}
      >
        <Grid item xs={8}>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="caption" display="block" gutterBottom>{note}</Typography>
          <Typography variant="body2" gutterBottom align="inherit" style={{ color: FONT_COLOR }} >${price}</Typography>
        </Grid>
        <Grid item xs={4}>
          <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/change-1585927834.png?crop=0.501xw:1.00xh;0,0&resize=100:*" />
        </Grid>
      </Grid>
    </Box>
  );
};
const mapStateToProps = (dispatch) => {
  return {
    addToCart: (id) => dispatch(addToCart(id))
  }
}
export default connect(null, mapStateToProps)(Item);
