import React from 'react';

import { Accordion, Card, useAccordionToggle } from 'react-bootstrap';

const ContainerCollapse = ({ children, className }) => {
  return (
    <Accordion className='text-center mb-0 w-100'>
      <Card className={`text-center p-0 m-0 ${className}`}>{children}</Card>
    </Accordion>
  );
};

ContainerCollapse.StaticHeader = ({ children, className }) => {
  return (
    <Accordion.Toggle
      as={Card.Header}
      eventKey='0'
      className={`p-0 m-0 container-header container-collapse-header ${className}`}
    >
      {children}
    </Accordion.Toggle>
  );
};

ContainerCollapse.DynamicHeader = ({ children, onHeaderToggle, className }) => {
  const CustomToggle = ({ children, eventKey, onHeaderToggle }) => {
    const decoratedOnClick = useAccordionToggle(eventKey, () => {
      onHeaderToggle();
    });

    return (
      <Card.Header
        className={`p-0 m-0 container-collapse-header ${className}`}
        onClick={decoratedOnClick}
      >
        {children}
      </Card.Header>
    );
  };

  return (
    <CustomToggle eventKey='0' onHeaderToggle={onHeaderToggle}>
      {children}
    </CustomToggle>
  );
};

ContainerCollapse.Body = ({ children, className }) => {
  return (
    <Accordion.Collapse eventKey='0'>
      <Card.Body className={`p-0 m-0  ${className}`}>{children}</Card.Body>
    </Accordion.Collapse>
  );
};

export default ContainerCollapse;
