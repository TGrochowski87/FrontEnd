import React from 'react';

import { Accordion, Card } from 'react-bootstrap';

const ContainerCollapse = ({ children }) => {
  return (
    <Accordion className='text-center mb-0 w-100'>
      <Card>{children}</Card>
    </Accordion>
  );
};

ContainerCollapse.Header = ({ children }) => {
  return (
    <Accordion.Toggle as={Card.Header} eventKey='0'>
      {children}
    </Accordion.Toggle>
  );
};

ContainerCollapse.Body = ({ children }) => {
  return (
    <Accordion.Collapse eventKey='0'>
      <Card.Body>{children}</Card.Body>
    </Accordion.Collapse>
  );
};

export default ContainerCollapse;
