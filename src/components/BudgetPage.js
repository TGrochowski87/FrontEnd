import React from "react";
import BudgetTable from "./BudgetTable";
import CategoryTable from "./CategoryTable";
import { Container, Row, Col } from "react-bootstrap";

const BudgetPage = () => {
  return (
    <Container fluid>
      <Row className="pt-5">
        <Col>
          <BudgetTable />
        </Col>
        <Col xs lg="3">
          <CategoryTable />
        </Col>
      </Row>
    </Container>
  );
};

export default BudgetPage;
