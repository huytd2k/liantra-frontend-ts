import React from 'react'
import './register-page.scss'
import FormHeader from '../../Component/FormHeader'
import { Container } from 'react-bootstrap'
import RegisterForm from '../../Component/RegisterForm'

interface RegisterPageProps {
}

export default function RegisterPage({}: RegisterPageProps) {
    return (
        <Container className="registerPage">
            <FormHeader />
            <RegisterForm />
        </Container>
    )
}