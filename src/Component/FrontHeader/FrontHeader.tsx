import React from 'react'
import './FrontHeader.css'
import { Button } from 'react-bootstrap'


export default function FrontHeader() {
    return (
        <header className ="frontHeader">
            <div className="contentContainer">
                <h1 className="title">Liantra</h1>
                <p className="description"> <b>Li</b>sten <b>an</b>d <b>Tra</b>ncribe</p>
                <div className="btnWrapper">
                    <Button className="startBtn">Start Learning</Button>
                    <div className="signUpBtn">
                        <a href="#" className="signInLink">Sign In </a>
                    </div>
                </div>
                
            </div>
        </header>
    )
}
