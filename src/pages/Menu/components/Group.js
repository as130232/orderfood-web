import React from "react";
import Item from "./Item";

const Group = ({ groupMenuData }) => {
  return (
    <>
      {groupMenuData.map((group, idx) => {
        return (
          <div key={idx}>
            <h2>{group.name}</h2>
            {group.items.map((item, idx) => {
              const { id, name, note, price } = item;
              return (
                <Item key={id} id={id} name={name} note={note} price={price} />
              );
            })}
          </div>
        );
      })}
    </>
  );
};
export default Group;
