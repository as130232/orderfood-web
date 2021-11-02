import React, { useState, useEffect } from "react"
import { connect } from 'react-redux'
import { useHistory, useLocation } from "react-router-dom"
import Selection from './Selection'
import { Box, Grid, TextField, Button, Typography, Divider, Stack } from '@mui/material'
import { addToCart, updateToCart, adjustQty } from '../../../../redux/Ordering/OrderingActions'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import { FONT_COLOR } from '../../../../global/globalStyle'

const Meal = ({ meal, cart, addToCart, updateToCart, adjustQty }) => {
  const [mealForm, setMealForm] = useState({
    selections: [],
    note: '',
    qty: 1
  })

  const history = useHistory()
  const search = useLocation().search
  const uuid = new URLSearchParams(search).get("uuid")

  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    let price = mealForm.qty * (meal.price + mealForm.selections.reduce((prev, cur) => { return prev + cur.price }, 0))
    setTotalPrice(price)
    // console.log('menuForm change ', mealForm, mealForm.selections)
  }, [mealForm, meal])

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
    addToCart(meal, mealForm.selections, mealForm.note, mealForm.qty)
    history.goBack()
  }

  const handleUpdateToCart = () => {
    updateToCart(uuid, meal, mealForm.selections, mealForm.note, mealForm.qty)
    history.goBack()
  }

  const handleSubCount = (event) => {
    if (mealForm.qty === 1) {
      return
    }
    let count = mealForm.qty - 1;
    setMealForm(prevFrom => {
      return {
        ...prevFrom,
        qty: count
      }
    })
  }

  const handleAddCount = (event) => {
    let count = mealForm.qty + 1;
    setMealForm(prevFrom => {
      return {
        ...prevFrom,
        qty: count
      }
    })
  }

  return (
    <Box>
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
      <Box role="presentation" sx={{ position: 'fixed', bottom: 16, width: '100%' }} >
        <Stack direction="row" spacing={3} justifyContent="center" alignItems="center">
          <Stack direction="row" spacing={1} alignItems="center">
            <RemoveCircleIcon fontSize="large" style={{ color: FONT_COLOR.ORANGE, cursor: 'pointer' }}
              onClick={handleSubCount} />
            <Typography variant="h5">{mealForm.qty}</Typography>
            <AddCircleIcon fontSize="large" style={{ color: FONT_COLOR.ORANGE, cursor: 'pointer' }}
              onClick={handleAddCount} />
          </Stack>
          <Button size="large" variant="contained"
            style={{ backgroundColor: FONT_COLOR.ORANGE }}
            onClick={uuid ? handleUpdateToCart : handleAddToCart}>
            {uuid ? "更新購物車" : "加入購物車"}　　${totalPrice}
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}
const mapStateToProps = (state) => {
  return {
    cart: state.order.cart,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addToCart: (meal, selections, note, qty) => dispatch(addToCart(meal, selections, note, qty)),
    updateToCart: (uuid, meal, selections, note, qty) => dispatch(updateToCart(uuid, meal, selections, note, qty)),
    adjustQty: (uuid, qty) => dispatch(adjustQty(uuid, qty)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Meal);
