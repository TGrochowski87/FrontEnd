import React from 'react';

import { Row } from 'react-bootstrap';

import ExpenseHeaderItem from './ExpenseHeaderItem';

const ExpenseHeader = ({ expenseData, icons }) => {
  return (
    <Row>
      <ExpenseHeaderItem icon={icons.category}>
        <ExpenseHeaderItem.Text data={expenseData.category} />
      </ExpenseHeaderItem>
      <ExpenseHeaderItem icon={icons.price}>
        <ExpenseHeaderItem.Price data={expenseData.price} />
      </ExpenseHeaderItem>
      <ExpenseHeaderItem icon={icons.date}>
        <ExpenseHeaderItem.Date data={expenseData.date} />
      </ExpenseHeaderItem>
      <ExpenseHeaderItem icon={icons.author}>
        <ExpenseHeaderItem.Text data={expenseData.author} />
      </ExpenseHeaderItem>
    </Row>
  );
};

export default ExpenseHeader;
