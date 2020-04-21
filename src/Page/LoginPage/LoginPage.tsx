import React from "react";
import "./login-page.scss";
import { Container } from "react-bootstrap";
import LoginPanel from "../../Component/LoginPanel";

interface LoginPageProps {}

export default function LoginPage({}: LoginPageProps) {
  return (
    <Container className="loginPage">
       <LoginPanel />
    </Container>
  );
}
