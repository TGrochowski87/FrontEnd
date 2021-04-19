import React, { useState } from "react";
import BudgetTable from "./BudgetTable";
import FilterPanel from "./filters/FilterPanel";
import { Container, Row, Col } from "react-bootstrap";

const BudgetPage = ({ categories }) => {
  const [filterTabStatus, setFilterTabStatus] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  window.addEventListener("scroll", (event) => {
    if (window.scrollY / window.screenY > 0.13) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <>
      <Container fluid>
        <Row className="pt-5">
          <Col>
            <BudgetTable
              data={data}
              setData={setData}
              filteredData={filteredData}
              setFilteredData={setFilteredData}
            />
          </Col>
        </Row>
      </Container>
      <FilterPanel
        filterTabStatus={filterTabStatus}
        setFilterTabStatus={setFilterTabStatus}
        isScrolled={isScrolled}
        categories={categories}
        setFilteredData={setFilteredData}
      />
    </>
  );
};

export default BudgetPage;
