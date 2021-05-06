import React from 'react';

import { Card } from 'react-bootstrap';

const ContainerCard = ({ children, className }) => {
  return <Card className={`text-center p-0 m-0 ${className}`}>{children}</Card>;
};

ContainerCard.Header = ({ children, className }) => {
  return (
    <Card.Header className={`p-0 m-0 ${className}`}>{children}</Card.Header>
  );
};

ContainerCard.Body = ({ children, className }) => {
  return <Card.Body className={`p-0 m-0 ${className}`}>{children}</Card.Body>;
};

export default ContainerCard;
