import { Container, Row, Col, Image } from 'react-bootstrap'
import { Box, Grid, Divider } from '@material-ui/core';


const Item = ({ id, name, note, price }) => {
  return (
    // <Container>
    //   <Row>
    //     <Col xs={8}>
    //       <h5 ><b>{name}</b></h5>
    //       <span>{note}</span>
    //       <h6 className="f-w-300 d-flex align-items-center m-b-0">${price}</h6>
    //     </Col>
    //     <Col xs={4}>
    //       <Image src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/change-1585927834.png?crop=0.501xw:1.00xh;0,0&resize=640:*" fluid rounded />
    //     </Col>
    //     {/* <Divider /> */}
    //   </Row>
    // </Container>
    <Grid container justifyContent="center" sm item xs={12}>
      <Grid id={id} item xs={8}>
        <h5><b>{name}</b></h5>
        <span>{note}</span>
        <Box justifyContent="flex-end">${price}</Box>
      </Grid>
      <Grid item xs={4}>
        <Image src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/change-1585927834.png?crop=0.501xw:1.00xh;0,0&resize=100:*" fluid rounded />
      </Grid>
    </Grid>
  );
};

export default Item;
