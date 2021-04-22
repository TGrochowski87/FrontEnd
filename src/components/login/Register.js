import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import useFetch from "use-http";

import RegisterGoogle from "./RegisterGoogle";
import LoginInfoModal from "./LoginInfoModal";

const Register = () => {
  const [usernameInput, setUsernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [show, setShow] = useState(false);

  const { post } = useFetch(
    "https://webhomebudget.azurewebsites.net/api/UserLogin/Register"
  );

  const submitHandler = async (event) => {
    event.preventDefault();

    const fd = new FormData();

    const data = {
      password: passwordInput,
      email: emailInput,
      name: usernameInput,
    };
    fd.append("user", JSON.stringify(data));

    await post("", fd);
    setShow(true);
  };

  return (
    <>
      <LoginInfoModal show={show} setShow={setShow} register={true} />
      <Container className="my-5 w-50 login-space">
        <Row xs={1}>
          <Col>
            <RegisterGoogle />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form style={{ marginTop: "1rem" }} onSubmit={submitHandler}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="login"
                  placeholder="Username"
                  value={usernameInput}
                  onChange={(event) => setUsernameInput(event.target.value)}
                />
              </Form.Group>

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

              <Button variant="primary" type="submit">
                Sign up
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
