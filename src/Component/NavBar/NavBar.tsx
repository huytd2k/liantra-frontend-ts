import { useQuery, useMutation } from "@apollo/react-hooks";
import React, { useEffect } from "react";
import {
  Container,
  Nav,
  Navbar,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useShowLogin } from "../../Context/ShowLoginContext";
import { ME_QUERY, UserResponseData, LOGOUT_MUTATION } from "../../Model/UserInput";
import LoginPanel from "../LoginPanel";
import logoBrand from "./brand-logo.png";
import githubIcon from "./github-icon.svg";
import "./NavBar.scss";

export default function NavBar() {
  const { showLogin, setShowLogin } = useShowLogin();
  const { data, loading, error } = useQuery<UserResponseData>(ME_QUERY);
  const toggleLoginPanel = (e: React.MouseEvent) => {
    setShowLogin(!showLogin);
  };
  

  useEffect(() => console.log("invoke effect"), [data?.me]);
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
                  View on github
                  <img className="githubIcon" src={githubIcon}></img>
                </Link>
                {data?.me != undefined ? (
                  <PostLoginNav me={data!.me} isOk={data!.isOk} />
                ) : (
                  <PreLoginNav />
                )}
              </Nav>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {showLogin && <LoginPanel />}
    </div>
  );
}

function PreLoginNav() {
  return (
    <div>
      <Link to="/register" className="signUpButton">
        Sign Up
      </Link>
      <Link to="/learn" className="signInButton">
        Sign In
      </Link>
    </div>
  );
}

function PostLoginNav({ me }: UserResponseData) {
  const [logOut] = useMutation(LOGOUT_MUTATION); 
  return (
    <Dropdown>
      <Dropdown.Toggle className="dropdownUser" variant="success" id="dropdown-basic">
        {me.username}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-3">Profile</Dropdown.Item>
        <Dropdown.Item onClick={ () => { logOut(); window.location.reload()} } href="#/action-1">Log out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
