import React from 'react';

import { Button, Col, Container, Row } from 'react-bootstrap';

import HomePageJumbo from './HomePageJumbo';

const HomePage = () => {
  return (
    <HomePageJumbo>
      <Container fluid className='text-center'>
        <Row className='d-flex justify-content-center mb-3'>
          <h1>Home Budget Planner</h1>
        </Row>
        <Row className='d-flex justify-content-center mb-3'>
          <h4>
            The <b>DEFINITELY NOT #1</b> application for home budget management
          </h4>
        </Row>
        <Row className='d-flex justify-content-center mb-3'>
          <h5>Enjoy!</h5>
        </Row>
        <Row>
          <Col sm={6} className='my-1'>
            <Button
              // as={Link}
              // to='/browse'
              variant='outline-secondary'
              className='w-75'
            >
              Example button 1
            </Button>
          </Col>
          <Col sm={6} className='my-1'>
            <Button
              // as={Link}
              // to='/add'
              variant='outline-secondary'
              className='w-75'
            >
              Example button 2
            </Button>
          </Col>
        </Row>
      </Container>
    </HomePageJumbo>
  );
};

export default HomePage;
