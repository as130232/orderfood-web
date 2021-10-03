import React from "react";
import { Box, Grid } from '@material-ui/core';
import Selection from './Selection'

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
        {meal.selections && meal.selections.map((selection, idx) => {
          return (
            <Selection selection={selection} key={idx} />
          )
        })}
      </div>
    </div>
  )
};
export default Meal;
