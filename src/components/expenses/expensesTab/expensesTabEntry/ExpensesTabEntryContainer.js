import React from 'react';

import { Row } from 'react-bootstrap';

const ExpensesTabEntryContainer = ({ children, onClick }) => {
  return (
    <Row noGutters className='border-bottom py-1' onClick={onClick}>
      {children}
    </Row>
  );
};

export default ExpensesTabEntryContainer;
