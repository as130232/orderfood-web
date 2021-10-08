import React from "react";
import Item from "./Item";
// import { Accordion, Collapse, Card } from 'react-bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, CardHeader, CardContent } from '@material-ui/core';

const Group = ({ groupMenuData }) => {
  return (
    <>
      {groupMenuData.map((group, idx) => {
        return (
          <Card key={idx} id={group.name}>
            <CardHeader title={group.name}>
            </CardHeader>
            {group.items.map((item) => {
              const { id, name, note, price } = item;
              return (
                <CardContent key={id}>
                  <Item key={id} id={id} name={name} note={note} price={price} />
                </CardContent>
              );
            })}
          </Card>
          // <Card className="mt-2" key={idx}>
          //   <Card.Header>
          //     <h2>{group.name}</h2>
          //   </Card.Header>
          //   {group.items.map((item, idx) => {
          //     const { id, name, note, price } = item;
          //     return (
          //       <Card.Body className='border-bottom' key={id}>
          //         <Item key={id} id={id} name={name} note={note} price={price} />
          //       </Card.Body>
          //     );
          //   })}
          // </Card>

          // <Accordion defaultActiveKey="0">
          //   <Accordion.Item eventKey="0">
          //     <Accordion.Header><h2>{group.name}</h2></Accordion.Header>
          //     <Accordion.Body>
          //       {group.items.map((item, idx) => {
          //         const { id, name, note, price } = item;
          //         return (
          //           <Card.Body className='border-bottom'>
          //             <Item key={id} id={id} name={name} note={note} price={price} />
          //           </Card.Body>
          //         );
          //       })}
          //     </Accordion.Body>
          //   </Accordion.Item>
          // </Accordion>
        );
      })}
    </>
  );
};
export default Group;
