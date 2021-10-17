import React, { useState, useEffect } from "react"
import { connect } from 'react-redux'
import { useHistory, useLocation } from "react-router-dom"
import Selection from './Selection'
import { Box, Grid, TextField, Button, Typography, Divider } from '@material-ui/core'
import { addToCart, updateToCart } from '../../../../redux/Ordering/OrderingActions'

const Meal = ({ meal, cart, addToCart, updateToCart }) => {
  const [mealForm, setMealForm] = useState({
    selections: [],
    note: '',
    qty: 1
  })

  const history = useHistory()

  const search = useLocation().search
  const uuid = new URLSearchParams(search).get("uuid")

  useEffect(() => {
    console.log('menuForm change ', mealForm, mealForm.selections)
  }, [mealForm])

  useEffect(() => {
    if (uuid) {
      const existedMealInCart = cart.find(item => item.uuid === uuid)
      existedMealInCart && setMealForm({
        selections: existedMealInCart.selections,
        note: existedMealInCart.note,
        qty: existedMealInCart.qty
      })
    }
  }, [cart, uuid])

  const handleAddToCart = () => {
    addToCart(meal, mealForm.selections, mealForm.note)
    history.goBack()
  }

  const handleUpdateToCart = () => {
    console.log('uuid', uuid)
    updateToCart(uuid, meal, mealForm.selections, mealForm.note, mealForm.qty)
    history.goBack()
  }

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
        <Typography variant="body2">
          {meal.note}
        </Typography>
      </Box>
      <Divider variant="middle" />
      <Box sx={{ m: 2 }}>
        {meal.selections && meal.selections.map((selection, idx) => {
          // mealInCart.selections
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
          value={mealForm.note}
          onChange={(e) => { setMealForm(prev => ({ ...prev, note: e.target.value })) }}
        />
      </Box>
      <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
        <Button color="secondary" variant="contained" onClick={uuid ? handleUpdateToCart : handleAddToCart}>{uuid ? "更新購物車" : "加入購物車"}</Button>
      </Box>
    </Box>
  )
}
const mapStateToProps = (state, dispatch) => {
  return {
    cart: state.order.cart,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addToCart: (meal, selections, note) => dispatch(addToCart(meal, selections, note)),
    updateToCart: (uuid, meal, selections, note, qty) => dispatch(updateToCart(uuid, meal, selections, note, qty))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Meal);
