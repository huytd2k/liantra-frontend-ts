import React from 'react'
import './profile-card.scss'
import { ButtonGroup, Button, Card } from 'react-bootstrap'

interface ProfileCardProps {
}

export default function ProfileCard({ }: ProfileCardProps) {
    return (
        <Card className="profileCard">
            <Card.Title> huytran2khust</Card.Title>
            <ButtonGroup vertical>
                <Button>
                    Profile
                    </Button>
                <Button>
                    
                    </Button>
                <Button>
                    Some btn
                    </Button>
                <Button>
                    Some btn
                    </Button>
            </ButtonGroup>
        </Card>
    )
}