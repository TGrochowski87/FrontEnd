import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Layout = (props) => {
  return (
    <Container className="layout">
      <Row className="pt-5">
        <Col>{props.children}</Col>
      </Row>
    </Container>
  );
};

export default Layout;
