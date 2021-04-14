import React from "react";
import { Jumbotron as Jumbo, Container } from "react-bootstrap";
import BackImage from "../assets/money-back.jpg";

const Jumbotron = () => {
  return (
    <Jumbo className="jumbo">
      <img src={BackImage} alt="" />
      <div className="overlay"></div>
      <Container>
        <h1>Welcome to Home Budget Planner</h1>
        <p>An application that makes managing budget easy</p>
      </Container>
      {/* <div className="image"></div> */}
    </Jumbo>
  );
};

export default Jumbotron;
