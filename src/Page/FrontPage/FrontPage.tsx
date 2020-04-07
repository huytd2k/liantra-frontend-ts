import React, { Props } from "react";
import FrontHeader from "../../Component/FrontHeader";
import LevelCard from "../../Component/LevelCard/LevelCard";
import { Row, Container } from "react-bootstrap";
import Bg1 from './../../bg1.jpeg'
import './FrontPage.css'

export default function FrontPage() {
  return (
    <div className="Frontpage">
      <FrontHeader />
      <Container className="mainCtn">
        <Row className = "levelRow">
          <LevelCard key={1} level={1} title= "Beginner"/>
          <LevelCard key={2} level={2} title= "Easy"/>
          <LevelCard key={3} level={3} title= "Medium"/>
          <LevelCard key={4} level={4}  title= "Hard"/>
        </Row>
      </Container>
    </div>
  );
}
