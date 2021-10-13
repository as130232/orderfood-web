import React, { useState, useEffect } from "react"
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom"
import Selection from './Selection'
import { Box, Grid, TextField, Button, Typography, Divider } from '@material-ui/core'
import { addToCart } from '../../../../redux/Ordering/OrderingActions'

const Meal = ({ meal, addToCart }) => {
  const [mealForm, setMealForm] = useState({
    selections: [],
    note: ''
  })

  const history = useHistory()
  const handleAddToCart = () => {
    addToCart(meal, mealForm.selections, mealForm.note)
    history.goBack()
  }

  useEffect(() => {
    console.log('menuForm change ', mealForm, mealForm.selections)
  }, [mealForm])

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <Box sx={{ my: 3, mx: 2 }}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h4" component="div">
              {meal.name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h6" component="div">
              ${meal.price}
            </Typography>
          </Grid>
        </Grid>
        <Typography color="text.secondary" variant="body2">
          {meal.note}
        </Typography>
      </Box>
      <Divider variant="middle" />
      <Box sx={{ m: 2 }}>
        {meal.selections && meal.selections.map((selection, idx) => {
          return (
            <Selection selection={selection} key={idx} mealForm={mealForm} setMealForm={setMealForm} />
          )
        })}
        <p></p>
        <TextField
          id="outlined-basic"
          label="備註"
          variant="outlined"
          multiline
          rows={1}
          onChange={(e) => { setMealForm(prev => ({ ...prev, note: e.target.value })) }}
        />
      </Box>
      <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
        <Button color="secondary" variant="contained" onClick={handleAddToCart}>加入購物車</Button>
      </Box>
    </Box>
  )
}
const mapStateToProps = dispatch => {
  return {
    addToCart: (meal, selections, note) => dispatch(addToCart(meal, selections, note))
  }
}
export default connect(null, mapStateToProps)(Meal);
