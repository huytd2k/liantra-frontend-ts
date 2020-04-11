import React from 'react'
import './register-form.scss'
import { Form, Button } from 'react-bootstrap'

interface RegisterFormProps {
}

export default function RegisterForm({ }: RegisterFormProps) {
    return (
        <div className="registerForm">
            <Form>
                <Form.Group>
                    <Form.Label>Email address :</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                            </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Username: </Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        Username should be at least 6 characters.   
                            </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password :</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Retype password :</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                    <Form.Text className="text-muted">
                        Password should be at least 6 characters.
                    </Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Check type="checkbox" label="Remember me!" />
                </Form.Group>

                <Button variant="outline-success" className="regSubmitBtn"type="submit">
                    Start using Liantra
                        </Button>
            </Form>
        </div>
    )
}