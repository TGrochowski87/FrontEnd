import React from 'react';

import { Col, Container, Row, Jumbotron } from 'react-bootstrap';

const HomePageJumbo = ({ children }) => {
  return (
    <Jumbotron fluid className='home-page-jumbo m-0 p-0'>
      <Container className='h-100'>
        <Row noGutters className='h-100'>
          <Col className='d-flex align-items-center justify-content-center'>
            <div className='overlay p-5'>{children}</div>
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  );
};

export default HomePageJumbo;
