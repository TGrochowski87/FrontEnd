import React from 'react';

import { Col, Container, Row } from 'react-bootstrap';

import NumberFormat from 'react-number-format';

const IncomeItem = ({ icon, children }) => {
  return (
    <Row noGutters className='d-flex justify-content-center align-items-center'>
      <Col xs={3}>{icon}</Col>
      <Col xs={9} className='d-flex justify-content-start'>
        {children}
      </Col>
    </Row>
  );
};

IncomeItem.Container = ({ children }) => {
  return (
    <Container className='m-1 p-0'>
      <Row
        noGutters
        className='d-flex justify-content-around align-items-center w-100'
      >
        {children}
      </Row>
    </Container>
  );
};

IncomeItem.HeaderItem = ({ icon, children }) => {
  return (
    <Col
      xs={12}
      sm
      className='d-flex justify-content-xs-start justify-content-sm-center'
    >
      <Row noGutters className='w-100'>
        <Col xs={3} sm={0} className='d-sm-none'>
          {icon}
        </Col>
        <Col className='d-flex justify-content-xs-start justify-content-sm-center'>
          {children}
        </Col>
      </Row>
    </Col>
  );
};

IncomeItem.BodyItem = ({ icon, children }) => {
  return <IncomeItem icon={icon}>{children}</IncomeItem>;
};

IncomeItem.Text = ({ data }) => {
  return <span className='text-left'>{data || 'No data'}</span>;
};

IncomeItem.Price = ({ data }) => {
  if (data) {
    if (data < 0) {
      return <span className='text-muted font-italic'>Error</span>;
    }
    return (
      <NumberFormat
        value={data}
        displayType={'text'}
        thousandSeparator=','
        decimalSeparator='.'
        prefix={'$'}
        decimalScale={2}
        fixedDecimalScale
      />
    );
  }
  return <span>No data</span>;
};

IncomeItem.Date = ({ data }) => {
  if (data) {
    return <span>{new Date(data).toLocaleDateString()}</span>;
  }
  return <span>No data</span>;
};

export default IncomeItem;
