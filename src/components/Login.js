import React, { useState } from 'react';

import { Form, Button } from 'react-bootstrap';

import { GoogleLogin } from 'react-google-login';

import { useHistory } from 'react-router-dom';

import useFetch from 'use-http';

const Login = ({ setNickName }) => {
  const [loginInput, setLoginInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const {
    post,
    loading: expensesLoading,
    error: expensesError,
    response,
  } = useFetch(`https://webhomebudget.azurewebsites.net/api/UserLogin/Login`);

  const history = useHistory();

  const successHandler = (response) => {
    setNickName(response.profileObj.name);
    history.push('/');
  };

  const failureHandler = (response) => {
    console.log(response);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const res = await post('', {
      email: emailInput,
      password: passwordInput,
    });
    if (response.ok) {
      console.log(res.result.access_Token);
      sessionStorage.setItem('userToken', res.result.access_Token);
    }
  };

  return (
    <div className='login-form'>
      <GoogleLogin
        clientId='547678833320-c51cue6q8t1q7mc1mrjfihpq5gk6ji30.apps.googleusercontent.com'
        buttonText='Sign in with Google'
        onSuccess={successHandler}
        onFailure={failureHandler}
        cookiePolicy={'single_host_origin'}
      />
      <Form style={{ marginTop: '1rem' }} onSubmit={submitHandler}>
        <Form.Group controlId='formBasicLogin'>
          <Form.Label>Login</Form.Label>
          <Form.Control
            type='text'
            placeholder='Login'
            value={loginInput}
            onChange={(event) => setLoginInput(event.target.value)}
          />
        </Form.Group>

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
    </div>
  );
};

export default Login;
