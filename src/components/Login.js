import React from "react";
import { Form, Button } from "react-bootstrap";
import { GoogleLogin } from "react-google-login";
import { useHistory } from "react-router-dom";

const Login = ({ setNickName }) => {
  const history = useHistory();

  const successHandler = (response) => {
    setNickName(response.profileObj.name);
    history.push("/");
  };

  const failureHandler = (response) => {
    console.log(response);
  };

  return (
    <div className="login-form">
      <GoogleLogin
        clientId="547678833320-vj5q760o37pk3btpm4jdqkh7febjbpoc.apps.googleusercontent.com"
        buttonText="Sign in with Google"
        onSuccess={successHandler}
        onFailure={failureHandler}
        cookiePolicy={"single_host_origin"}
      />
      <Form style={{ marginTop: "1rem" }}>
        <Form.Group controlId="formBasicLogin">
          <Form.Label>Login</Form.Label>
          <Form.Control type="text" placeholder="Login" />
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
        <Button variant="link" href="/register">
          Register new account
        </Button>
      </Form>
    </div>
  );
};

export default Login;
