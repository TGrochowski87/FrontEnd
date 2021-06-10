import React, { useState } from "react";

import { Col, Container, Row, Tab, Nav } from "react-bootstrap";

import CustomPieChart from "./CustomPieChart";
import PeriodPicker from "./PeriodPicker";
import PositiveNegativeChart from "./PositiveNegativeChart";
import CustomLineChart from "./CustomLineChart";
import CustomBarChart from "./CustomBarChart";

const AnalysisPage = () => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [onlyYear, setOnlyYear] = useState(false);
  const [activeTab, setActiveTab] = useState(1);

  return (
    <Container className="analysis-page" fluid>
      <Tab.Container defaultActiveKey="1">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link
                  eventKey="1"
                  onClick={() => {
                    setActiveTab(1);
                  }}
                >
                  Balance of expenses and incomes
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="2"
                  onClick={() => {
                    setActiveTab(2);
                  }}
                >
                  Category share in overall balance
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="3"
                  onClick={() => {
                    setActiveTab(3);
                  }}
                >
                  Budget changes over time
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="4"
                  onClick={() => {
                    setActiveTab(4);
                  }}
                >
                  Planned and real amounts comparison
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <div className="picker">
              <PeriodPicker
                pickMonth={setMonth}
                pickYear={setYear}
                onlyYear={setOnlyYear}
              />
            </div>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="1">
                <Row>
                  <Col xs={2}></Col>
                  <Col xs={8} style={{ minWidth: "350px" }}>
                    {activeTab === 1 ? <PositiveNegativeChart /> : <></>}
                  </Col>
                  <Col xs={2}></Col>
                </Row>
              </Tab.Pane>
              <Tab.Pane eventKey="2">
                <Row className="sm-direction-column">
                  <Col xs={6} style={{ minWidth: "350px" }}>
                    {activeTab === 2 ? (
                      <CustomPieChart
                        title="Expenses"
                        chartFor="expense"
                        month={month}
                        year={year}
                        onlyYear={onlyYear}
                      />
                    ) : (
                      <></>
                    )}
                  </Col>
                  <Col xs={6} style={{ minWidth: "350px" }}>
                    {activeTab === 2 ? (
                      <CustomPieChart
                        title="Incomes"
                        chartFor="income"
                        month={month}
                        year={year}
                        onlyYear={onlyYear}
                      />
                    ) : (
                      <></>
                    )}
                  </Col>
                </Row>
              </Tab.Pane>
              <Tab.Pane eventKey="3">
                <Row>
                  <Col xs={2}></Col>
                  <Col xs={8} style={{ minWidth: "350px" }}>
                    {activeTab === 3 ? (
                      <CustomLineChart
                        month={month}
                        year={year}
                        onlyYear={onlyYear}
                      />
                    ) : (
                      <></>
                    )}
                  </Col>
                  <Col xs={2}></Col>
                </Row>
              </Tab.Pane>
              <Tab.Pane eventKey="4">
                <Row>
                  <Col xs={6} style={{ minWidth: "350px" }}>
                    {activeTab === 4 ? (
                      <CustomBarChart
                        title="Expenses"
                        chartFor="expense"
                        month={month}
                        year={year}
                        onlyYear={onlyYear}
                      />
                    ) : (
                      <></>
                    )}
                  </Col>
                  <Col xs={6} style={{ minWidth: "350px" }}>
                    {activeTab === 4 ? (
                      <CustomBarChart
                        title="Incomes"
                        chartFor="income"
                        month={month}
                        year={year}
                        onlyYear={onlyYear}
                      />
                    ) : (
                      <></>
                    )}
                  </Col>
                </Row>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
    // <Container id="charts-container" fluid>
    //   <Row noGutters>
    //     <Col>
    //       <div className="header">
    //         <h2>Summary</h2>
    //       </div>
    //     </Col>
    //   </Row>
    //   <Row noGutters>
    //     <Col>
    //       <PositiveNegativeChart />
    //     </Col>
    //   </Row>
    //   <Row noGutters>
    //     <Col>
    // <div className="header">
    //   <h2>Details</h2>
    // <PeriodPicker
    //   pickMonth={setMonth}
    //   pickYear={setYear}
    //   onlyYear={setOnlyYear}
    // />
    //       </div>
    //     </Col>
    //   </Row>
    //   <Row noGutters>
    //     <Col xl={6}>
    //       <Row noGutters className="flex-column">
    //         <Col>
    // <CustomPieChart
    //   title="Expenses - categorized"
    //   chartFor="expense"
    //   month={month}
    //   year={year}
    //   onlyYear={onlyYear}
    // />
    //         </Col>
    //         <Col>
    // <CustomLineChart
    //   title="Expenses - over a period"
    //   month={month}
    //   year={year}
    //   onlyYear={onlyYear}
    // />
    //         </Col>
    //         <Col>
    // <CustomBarChart
    //   title="Expenses - categorized balance"
    //   chartFor="expense"
    //   month={month}
    //   year={year}
    //   onlyYear={onlyYear}
    // />
    //         </Col>
    //       </Row>
    //     </Col>
    //     <Col xl={6}>
    //       <Row noGutters className="flex-column">
    //         <Col>
    // <CustomPieChart
    //   title="Incomes - categorized"
    //   chartFor="income"
    //   month={month}
    //   year={year}
    //   onlyYear={onlyYear}
    // />
    //         </Col>
    //         <Col>
    // <CustomBarChart
    //   title="Incomes - categorized balance"
    //   chartFor="income"
    //   month={month}
    //   year={year}
    //   onlyYear={onlyYear}
    // />
    //         </Col>
    //       </Row>
    //     </Col>
    //   </Row>
    // </Container>
  );
};

export default AnalysisPage;
