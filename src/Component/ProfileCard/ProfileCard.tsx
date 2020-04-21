import React from 'react'
import './profile-card.scss'
import { ButtonGroup, Button, Card } from 'react-bootstrap'

interface ProfileCardProps {
}

export default function ProfileCard({ }: ProfileCardProps) {
    return (
        <div className="profileCard">
            <h1> Huy Tran.D</h1>
        </div>
    )
}