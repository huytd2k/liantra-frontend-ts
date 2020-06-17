import React from 'react'
import './profile-page.scss'
import { Row, Col, Container } from 'react-bootstrap'
import ProfileCard from '../../Component/ProfileCard'
import UserDashboard from '../../Component/UserDashBoard'
import { GetTapeData, GET_SESSION_QUERY, GetSessionData } from '../../Model/Tape'
import { useUser } from '../../Context/UserContext'
import { useQuery } from '@apollo/react-hooks'
interface ProfilePageProps {
}
interface sessionInput {
    userId: number
}
export default function ProfilePage({}: ProfilePageProps) {
    return (
        <div>
            <Container>
                <Row>
                    <Col xs={3}>
                        <ProfileCard />
                    </Col>
                    <Col xs={9}>
                        <UserDashboard />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}