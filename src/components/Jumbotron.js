import React from "react";
import { Jumbotron as Jumbo, Container } from "react-bootstrap";

const Jumbotron = () => {
  return (
    <Jumbo className="jumbo">
      <div className="image"></div>
      <Container>
        <h1>Welcome to home budget manager!</h1>
      </Container>
    </Jumbo>
  );
};

export default Jumbotron;
