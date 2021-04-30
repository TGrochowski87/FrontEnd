import React from 'react';

import ContainerCollapse from './../../utils/ContainerCollapse';

import ExpenseBody from './ExpenseBody';
import ExpenseHeader from './ExpenseHeader';

const Expense = ({ expenseData, icons }) => {
  return (
    <ContainerCollapse>
      <ContainerCollapse.Header>
        <ExpenseHeader expenseData={expenseData} icons={icons} />
      </ContainerCollapse.Header>
      <ContainerCollapse.Body>
        <ExpenseBody expenseData={expenseData} icons={icons} />
      </ContainerCollapse.Body>
    </ContainerCollapse>
  );
};

export default Expense;
