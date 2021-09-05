import React from "react";
import Item from "./Item";

const Group = ({ groupMenuData }) => {
  return (
    <>
      {groupMenuData.map((group) => {
        return (
          <React.Fragment key={group.id}>
            <h2>{group.name}</h2>
            {group.items.map((item) => {
              const { id, name, note, price } = item;
              return (
                <Item id={id} name={name} note={note} price={price} key={id} />
              );
            })}
          </React.Fragment>
        );
      })}
    </>
  );
};
export default Group;
