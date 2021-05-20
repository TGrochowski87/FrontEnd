import React from 'react';

import { Button, Col, Container, Row } from 'react-bootstrap';

import { Link } from 'react-router-dom';

const MessageAuth = ({ userName }) => {
  return (
    <Container fluid className='text-center'>
      <Row className='d-flex justify-content-center mb-3'>
        <h1>Home Budget Planner</h1>
      </Row>
      <Row className='d-flex justify-content-center mb-3'>
        <h4>
          Welcome <b>{userName}</b>! Did you earn some money or maybe spend a
          little bit?
        </h4>
      </Row>
      <Row>
        <Col sm={6} className='my-1'>
          <Button
            as={Link}
            to='/expenses'
            variant='outline-secondary'
            className='w-75'
          >
            Expenses
          </Button>
        </Col>
        <Col sm={6} className='my-1'>
          <Button
            as={Link}
            to='/incomes'
            variant='outline-secondary'
            className='w-75'
          >
            Incomes
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default MessageAuth;
