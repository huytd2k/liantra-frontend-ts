import React from 'react'
import { Modal } from 'react-bootstrap'
import { useShowLogin } from '../../Context/ShowLoginContext'
import LoginForm from '../LoginForm'
import './LoginPanel.css'

export default function LoginPanel() {
    const setShowLogin = useShowLogin().setShowLogin;
    const showLogin = useShowLogin().showLogin;
    return (
        <Modal className="loginPanel" onHide={() => setShowLogin(false)} show={showLogin} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title> Login </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <LoginForm />
            </Modal.Body>
        </Modal>
    )
}
