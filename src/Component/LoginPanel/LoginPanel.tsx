import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import FormHeader from "../FormHeader";
import "./LoginPanel.css";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_MUTATION, LoginReponseData, User } from "../../Model/UserInput";
import { useUser } from "../../Context/UserContext";
import {useCookies} from 'react-cookie'
export default function LoginPanel() {
  const setCookies = useCookies()[1]
  const {setUser} = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, { error, data,loading }] = useMutation<
    { login : LoginReponseData },
    { userInput: User }
  >(LOGIN_MUTATION, {
    variables: { userInput: { username, password} },
  });
  const handleLogin = async () => {
      const resData = await login();
      if (resData.data?.login.isOk) {
          setUser({
            userId: resData.data.login.userInfo.userId,
            username: resData.data.login.userInfo.username, 
            isLogged: true
          });
          setCookies("username", resData!.data.login.userInfo.username);
          setCookies("userId", resData!.data.login.userInfo.userId);
      }

  }
  console.log(data);
  if(loading) return <p>Loading</p>
  if (error) return <p>{error}</p>
  if (data?.login.isOk) return <Redirect to="/feed" />
  return (
    <div className="loginPanel">
        <FormHeader />
        <Form className="mainLoginForm">
          <Form.Group>
            <Form.Label>Username :</Form.Label>
            <Form.Control
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setUsername(e.target.value)
              }
              type="text"
              placeholder="Enter your username"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password :</Form.Label>
            <Form.Control
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setPassword(e.target.value)
              }
              type="password"
              placeholder="Enter your password"
            />
          </Form.Group>
          <Form.Group>
            <Form.Check type="checkbox" label="Remember me!" />
          </Form.Group>
          <Button
            onClick={handleLogin}
            variant="outline-success"
            className="signInSubmitBtn"
          >
            Sign in Liantra
          </Button>
          <Link className="registerLink" to="/register"> Don't have an account ? Sign in now</Link>
        </Form>
    </div>
  );
}
