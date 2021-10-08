import React from "react"
import Selection from './Selection'
import { Box, Grid, FormControl, TextField, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { addToCart } from '../../../../redux/Ordering/ordering-actions'
const handleAddToCart = (meal) => {
  alert(meal)
}

const Meal = ({ meal, addToCart }) => {
  return (
    <div>
      <Grid id={meal.id} container justifyContent="center" sm item xs={12} sm={6} md={4} lg={3}>
        <Grid item xs={8}>
          <h1><b>{meal.name}</b></h1>
          <span>{meal.note}</span>
          <Box justifyContent="flex-end">${meal.price}</Box>
        </Grid>
        <Grid item xs={4}>
          <div></div>
        </Grid>
      </Grid>
      <div>
        <FormControl component="fieldset">
          {meal.selections && meal.selections.map((selection, idx) => {
            return (
              <Selection selection={selection} key={idx} />
            )
          })}
          <TextField
            id="outlined-multiline-static"
            label="備註"
            multiline
            rows={2}
          />
          <Button variant="contained" onClick={() => addToCart(meal.id)}>新增至購物車</Button>
        </FormControl>
      </div>
    </div>
  )
}
const mapStateToProps = dispatch => {
  return {
    addToCart: (id) => dispatch(addToCart(id))
  }
}
export default connect(null, mapStateToProps)(Meal);
