import React from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();

  return (
    <div className="login-form">
      <Form
        onSubmit={() => {
          history.push("/");
        }}
      >
        <Form.Group controlId="formBasicLogin">
          <Form.Label>Login*</Form.Label>
          <Form.Control type="text" placeholder="Login" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password*</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email*</Form.Label>
          <Form.Control type="email" placeholder="Email" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;
