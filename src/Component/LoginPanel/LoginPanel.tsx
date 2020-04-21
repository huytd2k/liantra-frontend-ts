import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useShowLogin } from "../../Context/ShowLoginContext";
import LoginForm from "../LoginForm";
import "./LoginPanel.css";
import brandLogo from "../../asset/brand-logo.png"
import FormHeader from "../FormHeader";
import { Link } from "react-router-dom";
export default function LoginPanel() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
              type="password"
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
            onClick={(e: any) => {
              e.preventDefault();
            //   username && password && email && loginUser();
              window.location.reload();
            }}
            variant="outline-success"
            className="signInSubmitBtn"
            type="submit"
          >
            Sign in Liantra
          </Button>
          <Link className="registerLink" to="/register"> Don't have an account ? Sign in now</Link>
        </Form>
    </div>
  );
}
