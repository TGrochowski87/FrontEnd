import React from 'react';

import { Row } from 'react-bootstrap';

const BudgetTabEntryContainer = ({ children }) => {
  return (
    <Row noGutters className='border-bottom py-1'>
      {children}
    </Row>
  );
};

export default BudgetTabEntryContainer;
