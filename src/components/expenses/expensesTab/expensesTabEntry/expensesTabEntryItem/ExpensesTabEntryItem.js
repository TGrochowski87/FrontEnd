import React from 'react';

import { Col, Row } from 'react-bootstrap';

import ExpensesTabEntryItemDate from './ExpensesTabEntryItemDate';
import ExpensesTabEntryItemPrice from './ExpensesTabEntryItemPrice';
import ExpensesTabEntryItemText from './ExpensesTabEntryItemText';

const ExpensesTabEntryItem = ({ itemIcon, children }) => {
  return (
    <Col xs={12} sm={3}>
      <Row noGutters>
        <Col xs={3} sm={0} className='d-sm-none'>
          {itemIcon}
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

ExpensesTabEntryItem.Text = ExpensesTabEntryItemText;
ExpensesTabEntryItem.Price = ExpensesTabEntryItemPrice;
ExpensesTabEntryItem.Date = ExpensesTabEntryItemDate;

export default ExpensesTabEntryItem;
