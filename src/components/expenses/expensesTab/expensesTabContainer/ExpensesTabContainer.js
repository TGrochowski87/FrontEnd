import React from 'react';

import { Card } from 'react-bootstrap';

import ExpensesTabContainerBody from './ExpensesTabContainerBody';
import ExpensesTabContainerHeader from './ExpensesTabContainerHeader';
import ExpensesTabContainerText from './ExpensesTabContainerText';

const ExpensesTabContainer = ({ children: [header, body] }) => {
  return (
    <Card className='mb-3'>
      <Card.Header className='px-0 py-1'>{header}</Card.Header>
      <Card.Body className='p-0'>{body}</Card.Body>
    </Card>
  );
};

ExpensesTabContainer.Header = ExpensesTabContainerHeader;
ExpensesTabContainer.Body = ExpensesTabContainerBody;
ExpensesTabContainer.Text = ExpensesTabContainerText;

export default ExpensesTabContainer;
