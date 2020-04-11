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
export default function NavBar() {
  const {showLogin, setShowLogin} = useShowLogin();
  const toggleLoginPanel = (e : React.MouseEvent) => {
    setShowLogin(!showLogin);
  };
  return (
    <div>
      <Navbar variant="light" bg="light" expand="lg" className="NavBar">
        <Container>
          <Navbar.Brand className="brand" href="#home">
            Liantra
          </Navbar.Brand>
          <Navbar.Collapse>
            <div id="basic-navbar-nav" className="ml-auto">
              <Nav>
                <Button
                  href="#home"
                  className="linkOnNav"
                  onClick={toggleLoginPanel}>
                  Login
                </Button>
                <Nav.Link  className="linkOnNav">
                  <Link to="/">Home</Link>
                </Nav.Link>
                <Nav.Link  className="linkOnNav">
                  <Link to="/tape">Tape</Link>
                </Nav.Link>
              </Nav>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {showLogin && <LoginPanel />}
    </div>
  );
}
