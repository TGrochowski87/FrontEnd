import React from "react";
import { GoogleLogin } from "react-google-login";
import { useHistory } from "react-router";
import useFetch from "use-http";

const RegisterGoogle = () => {
  const history = useHistory();

  const { post, response } = useFetch(
    "https://webhomebudget.azurewebsites.net/api/register/provider"
  );

  const googlePost = async (token) => {
    const registerData = {
      token: token,
      provider: "google",
    };

    await post("", registerData);
    if (response.ok) {
      history.push("/login");
    }
  };

  const successHandler = (response) => {
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
