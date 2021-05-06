import React from 'react';

import { Col, Container, Row } from 'react-bootstrap';

import NumberFormat from 'react-number-format';

const ExpenseItem = ({ icon, children }) => {
  return (
    <Row noGutters className='d-flex justify-content-center align-items-center'>
      <Col xs={3}>{icon}</Col>
      <Col xs={9} className='d-flex justify-content-start'>
        {children}
      </Col>
    </Row>
  );
};

ExpenseItem.Container = ({ children }) => {
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

ExpenseItem.HeaderItem = ({ icon, children }) => {
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

ExpenseItem.BodyItem = ({ icon, children }) => {
  return <ExpenseItem icon={icon}>{children}</ExpenseItem>;
};

ExpenseItem.Text = ({ data }) => {
  return <span className='text-left'>{data || 'No data'}</span>;
};

ExpenseItem.Price = ({ data }) => {
  if (data) {
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

ExpenseItem.Date = ({ data }) => {
  if (data) {
    return <span>{new Date(data).toLocaleDateString()}</span>;
  }
  return <span>No data</span>;
};

export default ExpenseItem;
