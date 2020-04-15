import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import "./NavBar.css";
import LoginPanel from "../LoginPanel";
import { useShowLogin } from "../../Context/ShowLoginContext";
import { Link } from "react-router-dom";
import logoBrand from "./brand-logo.png";
import githubIcon from "./github-icon.svg";
import { useQuery } from "@apollo/react-hooks";
import { UserResponseData, ME_QUERY } from "../../Model/UserInput";

export default function NavBar() {
  const { showLogin, setShowLogin } = useShowLogin();
  // const { data, loading, error } = useQuery<UserResponseData>(ME_QUERY);
  // console.log(loading);
  // console.log(error);
  const toggleLoginPanel = (e: React.MouseEvent) => {
    setShowLogin(!showLogin);
  };
  return (
    <div>
      <Navbar variant="light" bg="light" expand="lg" className="NavBar">
        <Container>
          <Navbar.Brand className="brand" href="#home">
            <img className="logo" src={logoBrand}></img>
          </Navbar.Brand>
          <Navbar.Collapse>
            <div id="basic-navbar-nav" className="ml-auto">
              <Nav>
                {/* {data && <Link to="#">{data?.userInfo.username}</Link>} */}
                <Link to="#" className="signUpButton">
                  Sign Up
                </Link>
                <Link to="#" className="signInButton">
                  Sign In
                </Link>
                <Link to="#" className="signUpButton">
                  View on github
                  <img className="githubIcon" src={githubIcon}></img>
                </Link>
              </Nav>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {showLogin && <LoginPanel />}
    </div>
  );
}
