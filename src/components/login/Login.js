import React, { useState } from 'react';

import { Form, Button, Container, Row, Col } from 'react-bootstrap';

import useFetch from 'use-http';

import LoginGoogle from './LoginGoogle';
import LoginInfoModal from './LoginInfoModal';

const Login = ({ setUserName }) => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const [show, setShow] = useState(false);

  const { post, response } = useFetch(
    `https://webhomebudget.azurewebsites.net/api/login`
  );

  const submitHandler = async (event) => {
    event.preventDefault();
    const token = await post('', {
      email: emailInput,
      password: passwordInput,
    });
    if (response.ok) {
      sessionStorage.setItem('userToken', token.result.access_Token);
      setUserName(token.result.userName);
      sessionStorage.setItem('isAuthenticated', true);
      setShow(true);
    }
  };

  return (
    <>
      <LoginInfoModal show={show} setShow={setShow} register={false} />
      <Container className='my-5 w-50 login-space'>
        <Row xs={1}>
          <Col>
            <LoginGoogle setUserName={setUserName} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form style={{ marginTop: '1rem' }} onSubmit={submitHandler}>
              <Form.Group controlId='formBasicEmail'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Email'
                  value={emailInput}
                  onChange={(event) => setEmailInput(event.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Password'
                  value={passwordInput}
                  onChange={(event) => setPasswordInput(event.target.value)}
                />
              </Form.Group>

              {/* <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Keep me signed in" />
        </Form.Group> */}
              <Button variant='primary' type='submit'>
                Sign in
              </Button>
              <Button variant='link' href='/register'>
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
