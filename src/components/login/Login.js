import React, { useState } from "react";

import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router";

import useFetch from "use-http";

import LoginGoogle from "./LoginGoogle";

const Login = ({ setUserName, setLogoutShow }) => {
  const history = useHistory();

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const { post, response } = useFetch(
    `https://webhomebudget.azurewebsites.net/api/login`
  );

  const submitHandler = async (event) => {
    event.preventDefault();

    await post("", {
      email: emailInput,
      password: passwordInput,
    })
      .then((res) => {
        if (response.ok) {
          sessionStorage.setItem("userToken", res.result.access_Token);
          setUserName(res.result.userName);
          sessionStorage.setItem("isAuthenticated", true);

          setTimeout(() => {
            sessionStorage.removeItem("isAuthenticated");
            sessionStorage.removeItem("userToken");
            setUserName("");

            setLogoutShow(true);
          }, 10800000); //10800000
        }
      })
      .then(() => {
        history.push("/");
      });
  };

  return (
    <>
      <Container className="my-5 w-50 login-space">
        <Row xs={1}>
          <Col>
            <LoginGoogle
              setUserName={setUserName}
              setLogoutShow={setLogoutShow}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form style={{ marginTop: "1rem" }} onSubmit={submitHandler}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={emailInput}
                  onChange={(event) => setEmailInput(event.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={passwordInput}
                  onChange={(event) => setPasswordInput(event.target.value)}
                />
              </Form.Group>

              {/* <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Keep me signed in" />
        </Form.Group> */}
              <Button variant="primary" type="submit">
                Sign in
              </Button>
              <Button variant="link" href="/register">
                Register new account
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
