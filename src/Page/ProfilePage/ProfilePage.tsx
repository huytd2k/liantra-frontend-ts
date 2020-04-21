import React from 'react'
import './profile-page.scss'
import { Row, Col, Container } from 'react-bootstrap'
import ProfileCard from '../../Component/ProfileCard'
import UserDashboard from '../../Component/UserDashBoard'
interface ProfilePageProps {
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