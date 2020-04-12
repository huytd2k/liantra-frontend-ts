import React from 'react'
import './FrontHeader.css'
import { Button, Jumbotron, Container, Row, Col } from 'react-bootstrap'
import RegisterForm from '../RegisterForm'
import bg from './bg.jpeg'
const sectionBgStyle = {
    backgroundImage : `url(${bg})`,
}

export default function FrontHeader() {
    return (
        <Jumbotron fluid className="contentContainer" >
            <Container>
                <Row>
                    <Col xs={6} className="brandName" >
                        <h1 className="title">Listen and transcibe</h1>
                        <p className="description">Practice English's listening skill by transcribing.</p>
                    </Col>
                    <Col xs={6}>
                        <RegisterForm />
                    </Col>
                </Row>
            </Container>
        </Jumbotron>
    )
}
