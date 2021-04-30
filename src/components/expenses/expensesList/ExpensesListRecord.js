import React from 'react';

import { Row } from 'react-bootstrap';

const ExpensesListRecord = ({ children }) => {
  return (
    <Row noGutters className='justify-content-center text-center w-100'>
      {children}
    </Row>
  );
};

export default ExpensesListRecord;
