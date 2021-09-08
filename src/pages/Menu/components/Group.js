import React from "react";
import Item from "./Item";
import { Collapse, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const Group = ({ groupMenuData }) => {

  return (
    <>
      {groupMenuData.map((group, idx) => {
        return (
          <Card className="mt-2">
            <Card.Header>
              <h2>{group.name}</h2>
            </Card.Header>
            {group.items.map((item, idx) => {
              const { id, name, note, price } = item;
              return (
                <Card.Body className='border-bottom'>
                  <Item key={id} id={id} name={name} note={note} price={price} />
                </Card.Body>
              );
            })}
          </Card>
        );
      })}
    </>
  );
};
export default Group;
