import React, { useEffect, useState } from 'react';

import { Col, Container, Row } from 'react-bootstrap';

import CustomPieChart from './CustomPieChart';
import PeriodPicker from './PeriodPicker';

const ChartMock = ({ children }) => {
  // later to delete
  return (
    <div
      style={{
        color: 'white',
        backgroundColor: '#355F77',
        width: '100%',
        height: '444px',
        border: '1px solid black',
      }}
    >
      {children}
    </div>
  );
};

const AnalysisPage = () => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [onlyYear, setOnlyYear] = useState(false);

  // debug
  // useEffect(() => {
  //   console.log(month, year, onlyYear);
  // }, [month, year, onlyYear]);

  return (
    <Container id='charts-container' fluid>
      <Row noGutters>
        <Col>
          <div className='header'>
            <h2>Stats</h2>
          </div>
        </Col>
      </Row>
      <Row noGutters>
        <Col>
          <ChartMock>DUZY WYKRES</ChartMock>
        </Col>
      </Row>
      <Row noGutters>
        <Col>
          <div className='header'>
            <h2>Stats</h2>
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
          <Row noGutters className='flex-column'>
            <Col>
              <CustomPieChart
                title='Expenses'
                chartFor='expense'
                month={month}
                year={year}
                onlyYear={onlyYear}
              />
            </Col>
            <Col>
              <ChartMock>y</ChartMock>
            </Col>
            <Col>
              <ChartMock>y</ChartMock>
            </Col>
          </Row>
        </Col>
        <Col xl={6}>
          <Row noGutters className='flex-column'>
            <Col>
              <CustomPieChart
                title='Incomes'
                chartFor='income'
                month={month}
                year={year}
                onlyYear={onlyYear}
              />
            </Col>
            <Col>
              <ChartMock>x</ChartMock>
            </Col>
            <Col>
              <ChartMock> x</ChartMock>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AnalysisPage;
