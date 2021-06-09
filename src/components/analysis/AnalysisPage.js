import React, { useState } from "react";

import { Col, Container, Row } from "react-bootstrap";

import CustomPieChart from "./CustomPieChart";
import PeriodPicker from "./PeriodPicker";
import PositiveNegativeChart from "./PositiveNegativeChart";
import CustomLineChart from "./CustomLineChart";
import CustomBarChart from "./CustomBarChart";

const AnalysisPage = () => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [onlyYear, setOnlyYear] = useState(false);

  return (
    <Container id="charts-container" fluid>
      <Row noGutters>
        <Col>
          <div className="header">
            <h2>Summary</h2>
          </div>
        </Col>
      </Row>
      <Row noGutters>
        <Col>
          <PositiveNegativeChart />
        </Col>
      </Row>
      <Row noGutters>
        <Col>
          <div className="header">
            <h2>Details</h2>
            <PeriodPicker
              pickMonth={setMonth}
              pickYear={setYear}
              onlyYear={setOnlyYear}
            />
          </div>
        </Col>
      </Row>
      <Row noGutters>
        <Col xl={6}>
          <Row noGutters className="flex-column">
            <Col>
              <CustomPieChart
                title="Expenses - categorized"
                chartFor="expense"
                month={month}
                year={year}
                onlyYear={onlyYear}
              />
            </Col>
            <Col>
              <CustomLineChart
                title="Expenses - over a period"
                month={month}
                year={year}
                onlyYear={onlyYear}
              />
            </Col>
            <Col>
              <CustomBarChart
                title="Expenses - categorized balance"
                chartFor="expense"
                month={month}
                year={year}
                onlyYear={onlyYear}
              />
            </Col>
          </Row>
        </Col>
        <Col xl={6}>
          <Row noGutters className="flex-column">
            <Col>
              <CustomPieChart
                title="Incomes - categorized"
                chartFor="income"
                month={month}
                year={year}
                onlyYear={onlyYear}
              />
            </Col>
            <Col>
              {/* <CustomLineChart
                title="Incomes - over a period"
                chartFor="income"
                month={month}
                year={year}
                onlyYear={onlyYear}
              /> */}
            </Col>
            <Col>
              <CustomBarChart
                title="Incomes - categorized balance"
                chartFor="income"
                month={month}
                year={year}
                onlyYear={onlyYear}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AnalysisPage;
