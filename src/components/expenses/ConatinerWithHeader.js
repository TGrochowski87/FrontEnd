import React from 'react';

import { Card } from 'react-bootstrap';

const ConatinerWithHeader = ({ headerJustify, contentJustify, children }) => {
  return (
    <Card className='text-center mb-5'>
      <Card.Header>{children.header}</Card.Header>
      <Card.Body>{children.body}</Card.Body>
    </Card>
  );
};

export default ConatinerWithHeader;
