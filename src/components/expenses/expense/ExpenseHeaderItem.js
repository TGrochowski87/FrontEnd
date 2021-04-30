import React from 'react';

import { Col, Row } from 'react-bootstrap';

import NumberFormat from 'react-number-format';

const ExpenseHeaderItem = ({ icon, children }) => {
  return (
    <Col xs={12} sm={3}>
      <Row noGutters>
        <Col xs={3} sm={0} className='d-sm-none'>
          {icon}
        </Col>
        <Col
          xs={9}
          sm={12}
          className='d-flex justify-content-xs-start justify-content-sm-center'
        >
          {children}
        </Col>
      </Row>
    </Col>
  );
};

ExpenseHeaderItem.Text = ({ data }) => {
  return <span>{data || 'No data'}</span>;
};

ExpenseHeaderItem.Price = ({ data }) => {
  if (data) {
    return (
      <NumberFormat
        value={data}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'$'}
        decimalScale={2}
        fixedDecimalScale
      />
    );
  }
  return <span>No data</span>;
};

ExpenseHeaderItem.Date = ({ data }) => {
  if (data) {
    return <span>{new Date(data).toLocaleDateString()}</span>;
  }
  return <span>No data</span>;
};

export default ExpenseHeaderItem;
