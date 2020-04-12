import React from 'react'
import './tape-feed.scss'
import { Tape } from '../../Model/Tape'
import TapeCard from '../../Component/TapeCard'
import { Container, Col, Row } from 'react-bootstrap'
import ProfileCard from '../../Component/ProfileCard'

interface TapeFeedProps {

}
const mockTape: Tape[] = [
    {
        id: 1,
        title: "Some title",
        description: "Some descrition",
        script: "asdasdasdas",
        level: 3,
        ytUrl: "youtube.com",
        tags: ["tag1", "tag3", "teded", "social"]
    },
    {
        id: 2,
        title: "Some title",
        description: "Some description",
        script: "asdasdasdas",
        level: 3,
        ytUrl: "youtube.com",
        tags: ["tag1", "tag3", "teded", "social"]
    },
    {
        id: 3,
        title: "Some title",
        description: "Some description",
        script: "some ",
        level: 3,
        ytUrl: "youtube.com",
        tags: ["tag1", "tag3", "teded", "social"]
    },
    {
        id: 2,
        title: "Some title",
        description: "Some description",
        script: "asdasdasdas",
        level: 3,
        ytUrl: "youtube.com",
        tags: ["tag1", "tag3", "teded", "social"]
    },
    {
        id: 2,
        title: "Some title",
        description: "Some description",
        script: "asdasdasdas",
        level: 3,
        ytUrl: "youtube.com",
        tags: ["tag1", "tag3", "teded", "social"]
    },
    {
        id: 2,
        title: "Some title",
        description: "Some description",
        script: "asdasdasdas",
        level: 3,
        ytUrl: "youtube.com",
        tags: ["tag1", "tag3", "teded", "social"]
    }
]


export default function TapeFeed({ }: TapeFeedProps) {
    return (
        <Container>
            <Row>
                <Col xs={8}>
                    <h1> Choose your favorite tape to learn :</h1>
                    {mockTape.map((tape) => <TapeCard key={tape.id} tape={tape} />)}
                </Col>
                <Col xs={4}>
                    <ProfileCard />                    
                </Col>
            </Row>
        </Container>
    )
}