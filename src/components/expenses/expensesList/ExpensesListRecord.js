import React from 'react';

import { Row } from 'react-bootstrap';

const ExpensesListRecord = ({ children, className }) => {
  return (
    <Row
      noGutters
      className={`justify-content-center text-center w-100 ${className}`}
    >
      {children}
    </Row>
  );
};

export default ExpensesListRecord;
