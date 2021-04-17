import React from 'react';

import { Card } from 'react-bootstrap';

const BudgetList = ({ title, children }) => {
  return (
    <Card className='text-center'>
      <Card.Header>
        <h4>{title}</h4>
      </Card.Header>
      <Card.Body>{children}</Card.Body>
    </Card>
  );
};

export default BudgetList;
