import { Container, Row, Col, Image } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const Item = ({ id, name, note, price }) => {
  return (
    <Container>
      <Row>
        <Col xs={8}>
          <h5 ><b>{name}</b></h5>
          <span>{note}</span>
          <h7 className="f-w-300 d-flex align-items-center m-b-0">${price}</h7>
        </Col>
        <Col xs={4}>
          <Image src="https://i.imgur.com/R0qpw6h.jpg" fluid rounded />
        </Col>
      </Row>
    </Container>
  );
};

export default Item;
