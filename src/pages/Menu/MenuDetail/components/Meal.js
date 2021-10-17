import React, { useState, useEffect } from "react"
import { connect } from 'react-redux'
import { useHistory, useLocation } from "react-router-dom"
import Selection from './Selection'
import { Box, Grid, TextField, Button, Typography, Divider } from '@material-ui/core'
import { addToCart, updateToCart, adjustQty } from '../../../../redux/Ordering/OrderingActions'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import { FONT_COLOR } from '../../../../global/constants'

const Meal = ({ meal, cart, addToCart, updateToCart, adjustQty }) => {
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
        <p></p>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <RemoveCircleIcon fontSize="large" style={{ color: FONT_COLOR, cursor: 'pointer' }}
              onClick={handleSubCount} />
          </Grid>
          <Grid item>
            <Typography variant="h5">{mealForm.qty}</Typography>
          </Grid>
          <Grid item>
            <AddCircleIcon fontSize="large" style={{ color: FONT_COLOR, cursor: 'pointer' }}
              onClick={handleAddCount} />
          </Grid>
          <Grid item>
            <Button color="secondary" variant="contained" onClick={uuid ? handleUpdateToCart : handleAddToCart}>{uuid ? "更新購物車" : "加入購物車"}</Button>
          </Grid>
        </Grid>

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
    addToCart: (meal, selections, note, qty) => dispatch(addToCart(meal, selections, note, qty)),
    updateToCart: (uuid, meal, selections, note, qty) => dispatch(updateToCart(uuid, meal, selections, note, qty)),
    adjustQty: (uuid, qty) => dispatch(adjustQty(uuid, qty)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Meal);
