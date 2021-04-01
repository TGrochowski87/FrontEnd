import React from "react";
import { Form, Button, Spinner } from "react-bootstrap";

const Login = () => {
  return (
    <div className="login-form">
      <Spinner animation="border" />
      <Form>
        <Button variant="outline-primary">
          <img
            alt=""
            src="https://www.google.com/gmail/about/static/images/logo-gmail.png?cache=1adba63"
          />
          Sign in with Gmail
        </Button>
        <Form.Group controlId="formBasicLogin">
          <Form.Label>Login</Form.Label>
          <Form.Control type="email" placeholder="Login" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Keep me signed in" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign in
        </Button>
      </Form>
    </div>
  );
};

export default Login;
