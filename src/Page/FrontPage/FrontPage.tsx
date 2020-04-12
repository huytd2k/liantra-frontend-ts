import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import FrontHeader from "../../Component/FrontHeader";
import './FrontPage.css';

export default function FrontPage() {
  return (
    <div className="Frontpage">
      <FrontHeader />
      <hr className="lineBreak"></hr>
      <Container className="mainCtn">
        <p className="quote">
          "Speak a new language <br></br> So that the world will be a new world."
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
