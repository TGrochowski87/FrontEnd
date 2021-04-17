import React from 'react';

import { Card } from 'react-bootstrap';

import BudgetTabContainerBody from './BudgetTabContainerBody';
import BudgetTabContainerHeader from './BudgetTabContainerHeader';
import BudgetTabContainerText from './BudgetTabContainerText';

const BudgetTabContainer = ({ children: [header, body] }) => {
  return (
    <Card className='mb-3'>
      <Card.Header className='px-0 py-1'>{header}</Card.Header>
      <Card.Body className='p-0'>{body}</Card.Body>
    </Card>
  );
};

BudgetTabContainer.Header = BudgetTabContainerHeader;
BudgetTabContainer.Body = BudgetTabContainerBody;
BudgetTabContainer.Text = BudgetTabContainerText;

export default BudgetTabContainer;
