import React from "react";
import { GoogleLogin } from "react-google-login";
import useFetch from "use-http";

import { useHistory } from "react-router-dom";

const RegisterGoogle = ({ setShow }) => {
  const history = useHistory();

  const { post, response } = useFetch(
    "https://webhomebudget.azurewebsites.net/api/register/provider"
  );

  const googlePost = async (token) => {
    await post("", token);
    if (response.ok) {
      console.log("registered");
      setShow(true);
    }
  };

  const successHandler = (response) => {
    //console.log(response.tokenId);
    googlePost(response.tokenId);
  };

  const failureHandler = (response) => {
    console.log(response);
  };

  return (
    <GoogleLogin
      clientId="547678833320-c51cue6q8t1q7mc1mrjfihpq5gk6ji30.apps.googleusercontent.com"
      buttonText="Register with Google"
      onSuccess={successHandler}
      onFailure={failureHandler}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default RegisterGoogle;
