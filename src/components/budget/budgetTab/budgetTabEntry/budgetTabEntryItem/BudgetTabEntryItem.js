import React from 'react';

import { Col, Row } from 'react-bootstrap';

import BudgetTabEntryItemDate from './BudgetTabEntryItemDate';
import BudgetTabEntryItemPrice from './BudgetTabEntryItemPrice';
import BudgetTabEntryItemText from './BudgetTabEntryItemText';

const BudgetTabEntryItem = ({ children: [itemIcon, itemContent] }) => {
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
          {itemContent}
        </Col>
      </Row>
    </Col>
  );
};

BudgetTabEntryItem.Text = BudgetTabEntryItemText;
BudgetTabEntryItem.Price = BudgetTabEntryItemPrice;
BudgetTabEntryItem.Date = BudgetTabEntryItemDate;

export default BudgetTabEntryItem;
