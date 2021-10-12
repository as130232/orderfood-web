import React, { useState, useEffect } from "react"
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom"
import Selection from './Selection'
import { Box, Grid, FormControl, TextField, Button } from '@material-ui/core'
import { addToCart } from '../../../../redux/Ordering/ordering-actions'

const Meal = ({ meal, addToCart }) => {
  const [mealForm, setMealForm] = useState({
    selections: [],
    note: ''
  })
  const history = useHistory()

  const handleAddToCart = () => {
    addToCart(meal.id, mealForm.selections, mealForm.note)
    history.goBack()
  }

  useEffect(() => {
    console.log('menuForm change ', mealForm, mealForm.selections)
  }, [mealForm])

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
              <Selection selection={selection} key={idx} mealForm={mealForm} setMealForm={setMealForm} />
            )
          })}
          <TextField
            id="outlined-multiline-static"
            onChange={(e) => { setMealForm(prev => ({ ...prev, note: e.target.value })) }}
            label="備註"
            multiline
            rows={2}
          />
          <Button variant="contained" onClick={handleAddToCart}>新增至購物車</Button>
        </FormControl>
      </div>
    </div>
  )
}
const mapStateToProps = dispatch => {
  return {
    addToCart: (mealId, selections, note) => dispatch(addToCart(mealId, selections, note))
  }
}
export default connect(null, mapStateToProps)(Meal);
