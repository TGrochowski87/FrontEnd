import React from 'react';

import { Container } from 'react-bootstrap';

import ExpensesList from './expensesList/ExpensesList';

const ExpensesPage = () => {
  return (
    <Container className='py-3 list-container'>
      <ExpensesList />
    </Container>
  );
};

export default ExpensesPage;
