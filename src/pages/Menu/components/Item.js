import { Image } from 'react-bootstrap'
import { Box, Grid, Button } from '@material-ui/core';
import { useHistory } from "react-router-dom"
import { connect } from 'react-redux'
import { addToCart } from '../../../redux/Ordering/ordering-actions'

const Item = ({ id, name, note, price, addToCart }) => {
  let history = useHistory();
  return (
    <Grid id={id} container justifyContent="center" sm item xs={12} sm={6} md={4} lg={3}
      onClick={() => {
        history.push(`/store/meal?mealId=${id}`)
      }}
    >
      <Grid item xs={8}>
        <h5><b>{name}</b></h5>
        <span>{note}</span>
        <Box justifyContent="flex-end">${price}</Box>
      </Grid>
      <Grid item xs={4}>
        <Image src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/change-1585927834.png?crop=0.501xw:1.00xh;0,0&resize=100:*" fluid rounded />
      </Grid>
    </Grid>
  );
};
const mapStateToProps = (dispatch) => {
  return {
    addToCart: (id) => dispatch(addToCart(id))
  }
}
export default connect(null, mapStateToProps)(Item);
