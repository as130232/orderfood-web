import React from "react";
import Item from "./Item";
import { Card, CardHeader, CardContent, Box, Grid, Typography } from '@material-ui/core';

const Group = ({ groupMenuData }) => {
  return (
    <Box sx={{ my: 2, mx: 0 }}>
      {groupMenuData.map((group, idx) => {
        return (
          <Box sx={{ my: 3, mx: 2 }} key={idx} id={group.name}>
             <Typography variant="h5" gutterBottom component="div">{group.name}</Typography>
            {group.items.map((item) => {
              const { id, name, note, price } = item;
              return (
                <Item key={id} id={id} name={name} note={note} price={price} />
              );
            })}
          </Box>
        );
      })}
    </Box>
  );
};
export default Group;

