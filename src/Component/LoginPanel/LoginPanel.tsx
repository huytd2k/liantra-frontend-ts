import React from 'react'
import './LoginPanel.css'
import { Form, Button } from 'react-bootstrap'
import exitBtn from './../../asset/close.svg'
import {useShowLogin} from '../../Context/ShowLoginContext'

export default function LoginPanel() {
    const setShowLogin = useShowLogin().setShowLogin;
    return (
        <div className = "loginPanel">
            <Form className="loginForm">
                <div className = "exitBtnDiv">
                    <img src={exitBtn} className="exitBtn"  alt="exit" onClick={(e)=> setShowLogin(false)}></img>
                </div>
                <span className="formTitle">
                    Login
                </span>
                <Form.Group>
                    <Form.Control className="userInput"type="username" placeholder="Your username"></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Control className="userInput" type="password" placeholder="Your password" ></Form.Control>
                </Form.Group>
                <div className="forgotPwd">
                    <a href="#">Forgot your password ?</a>
                </div>
                <Button className="submitBtn"type ="submit">Login</Button>
            </Form>
        </div>
    )
}
