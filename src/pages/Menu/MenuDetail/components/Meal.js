import React from "react"
import Selection from './Selection'
import { Box, Grid, FormControl, TextField, Button } from '@material-ui/core'

const handleAddToCart = (meal) => {
  alert(meal)
}

const Meal = ({ meal }) => {
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
          <Button variant="contained" onClick={()=>handleAddToCart(meal)}>新增至購物車</Button>
        </FormControl>
      </div>
    </div>
  )
};
export default Meal;
