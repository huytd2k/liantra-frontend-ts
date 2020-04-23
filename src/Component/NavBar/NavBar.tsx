import { useMutation } from "@apollo/react-hooks";
import React from "react";
import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LOGOUT_MUTATION, User } from "../../Model/UserInput";
import logoBrand from "./brand-logo.png";
import githubIcon from "./github-icon.svg";
import "./NavBar.scss";
import { useUser, UserContextState } from "../../Context/UserContext";
import {useCookies} from 'react-cookie';
export default function NavBar() {
  const {user} = useUser();
  return (
    <div>
      <Navbar variant="light" bg="light" expand="lg" className="NavBar">
        <Container>
          <Navbar.Brand className="brand" href="#">
            <img className="logo" src={logoBrand}></img>
          </Navbar.Brand>
          <Navbar.Collapse>
            <div id="basic-navbar-nav" className="ml-auto">
              <Nav>
                <Link to="#" className="signUpButton">
                  View on github
                  <img className="githubIcon" src={githubIcon}></img>
                </Link>
                {user?.username != undefined ? (
                  <PostLoginNav user={user} />
                ) : (
                  <PreLoginNav />
                )}
              </Nav>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

function PreLoginNav() {
  return (
    <div>
      <Link to="/register" className="signUpButton">
        Sign Up
      </Link>
      <Link to="/login" className="signInButton">
        Sign In
      </Link>
    </div>
  );
}
interface PostLoginNavProps {
  user: UserContextState,
}

function PostLoginNav( {user} : PostLoginNavProps) {
  const removeCookies = useCookies()[2];
  const [logOut] = useMutation(LOGOUT_MUTATION); 
  return (
    <Dropdown>
      <Dropdown.Toggle className="dropdownUser" variant="success" id="dropdown-basic">
        {user.username}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-3">Profile</Dropdown.Item>
        <Dropdown.Item onClick={ () => {removeCookies("username"); removeCookies("userId"); logOut(); window.location.reload()} } href="#/action-1">Log out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
