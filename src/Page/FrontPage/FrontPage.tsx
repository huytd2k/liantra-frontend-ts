import React from "react";
import { Container } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import FrontHeader from "../../Component/FrontHeader";
import './FrontPage.css';
import { useUser } from "../../Context/UserContext";


export default function FrontPage() {
  const {user} = useUser();
  if (user.isLogged) return <Redirect to="/feed" />
  return (
    <div className="Frontpage">
      <FrontHeader />
      <hr className="lineBreak"></hr>
      <Container className="mainCtn">
        <p className="quote">
          &quot;Speak a new language <br></br> So that the world will be a new world. &quot;
        </p>
        <p className="quoteAuthor">
          - Rumi.
        </p>
      </Container>
      <footer className="frontFooter">
          <p>This site was created with ❤ by <a>m1k3y</a></p>
      </footer>
    </div>
  );
}
