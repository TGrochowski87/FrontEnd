import React from "react";
import BudgetTable from "./BudgetTable";
import Jumbotron from "./Jumbotron";
import { Container, Row, Col } from "react-bootstrap";

const BudgetPage = () => {
  return (
    <Container fluid>
      <Jumbotron />
      <Row className="pt-5">
        <Col>
          <BudgetTable />
        </Col>
      </Row>
    </Container>
  );
};

export default BudgetPage;
