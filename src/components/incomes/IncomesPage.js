import React from 'react';

import { Container } from 'react-bootstrap';

import IncomesList from './incomesList/IncomesList';

const IncomesPage = () => {
  return (
    <Container className='py-3 list-container'>
      <IncomesList />
    </Container>
  );
};

export default IncomesPage;
