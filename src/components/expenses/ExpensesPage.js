import React from 'react';

import { Container } from 'react-bootstrap';

import ExpensesList from './expensesList/ExpensesList';

const ExpensesPage = () => {
  return (
    <Container className='my-3 expenses-page'>
      <ExpensesList />
    </Container>
  );
};

export default ExpensesPage;
