import React from "react";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import useFetch from "use-http";

const LoginGoogle = ({ setUserName, logout }) => {
  const history = useHistory();

  const { post, response } = useFetch(
    "https://webhomebudget.azurewebsites.net/api/login/provider"
  );

  const googlePost = async (tokenId) => {
    const loginData = {
      token: tokenId,
      provider: "google",
    };

    const token = await post("", loginData);

    if (response.ok) {
      sessionStorage.setItem("userToken", token.result.access_Token);
      setUserName(token.result.userName);
      sessionStorage.setItem("isAuthenticated", true);

      setTimeout(() => {
        logout();
      }, 10800000);

      history.push("/");
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
      buttonText="Sign in with Google"
      onSuccess={successHandler}
      onFailure={failureHandler}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default LoginGoogle;
