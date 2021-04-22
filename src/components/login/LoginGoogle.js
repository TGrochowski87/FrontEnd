import React from "react";
import { GoogleLogin } from "react-google-login";
import useFetch from "use-http";
import { useHistory } from "react-router-dom";

const LoginGoogle = ({ setUserName }) => {
  const history = useHistory();

  const { post, response } = useFetch(
    "https://webhomebudget.azurewebsites.net/api/Google/Login"
  );

  const googlePost = async (tokenId) => {
    const token = await post("", tokenId);
    if (response.ok) {
      sessionStorage.setItem("userToken", token.result.access_Token);
      setUserName(token.result.userName);
      sessionStorage.setItem("isAuthenticated", true);
    }
  };

  const successHandler = (response) => {
    googlePost(response.tokenId).then(() => {
      history.push("/");
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
