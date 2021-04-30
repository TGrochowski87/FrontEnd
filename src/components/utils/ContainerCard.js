import React from 'react';

import { Card } from 'react-bootstrap';

const ContainerCard = ({ children }) => {
  return <Card className='text-center mb-5'>{children}</Card>;
};

ContainerCard.Header = ({ children }) => {
  return <Card.Header>{children}</Card.Header>;
};

ContainerCard.Body = ({ children }) => {
  return <Card.Body className='p-0'>{children}</Card.Body>;
};

export default ContainerCard;
