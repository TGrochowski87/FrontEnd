import React from "react";
import { GoogleLogin } from "react-google-login";
import useFetch from "use-http";

const LoginGoogle = ({ setUserName, setShow, setLogoutShow }) => {
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
      console.log(token);
      sessionStorage.setItem("userToken", token.result.access_Token);
      setUserName(token.result.userName);
      sessionStorage.setItem("isAuthenticated", true);

      setTimeout(() => {
        sessionStorage.removeItem("isAuthenticated");
        sessionStorage.removeItem("userToken");
        setUserName("");

        setLogoutShow(true);
      }, 10800000);
    }
  };

  const successHandler = (response) => {
    googlePost(response.tokenId).then(() => {
      setShow(true);
    });
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
