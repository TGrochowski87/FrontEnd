import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { Container, Row, Col } from "react-bootstrap";

const CategoryBlock = () => {
  return (
    <div className="category-block">
      <FontAwesomeIcon icon={faTrashAlt} className="delete-category" />
      <p>Placeholder</p>
      <FontAwesomeIcon icon={faPlusSquare} className="add-category" />
    </div>
    // <Container fluid className="category-block">
    //   <Row className="justify-content-md-center">
    //     <Col xs={1}>
    //       <FontAwesomeIcon icon={faTrashAlt} className="delete-category" />
    //     </Col>
    //     <Col>
    //       <p>Placeholder</p>
    //     </Col>
    //     <Col xs={2}>
    //       <FontAwesomeIcon icon={faPlusSquare} className="add-category" />
    //     </Col>
    //   </Row>
    // </Container>
  );
};

export default CategoryBlock;
