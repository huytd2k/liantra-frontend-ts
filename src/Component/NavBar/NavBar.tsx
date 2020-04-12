import React from "react";
import {
  Navbar,
  Nav,
  Button,
  Container
} from "react-bootstrap";
import "./NavBar.css";
import LoginPanel from "../LoginPanel";
import {
  useShowLogin
} from "../../Context/ShowLoginContext";
import { Link } from "react-router-dom";
import logoBrand from './brand-logo.png';
import githubIcon from './github-icon.svg'


export default function NavBar() {
  const { showLogin, setShowLogin } = useShowLogin();
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
