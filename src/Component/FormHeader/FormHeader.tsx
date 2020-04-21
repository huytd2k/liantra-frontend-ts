import React from 'react'
import './form-header.scss'
import brandLogo from '../../asset/brand-logo.png'
interface FormHeaderProps {
}

export default function FormHeader({}: FormHeaderProps) {
    return ( 
        <div className="headerLogin">
            <img alt="logo-brand"src={brandLogo}></img>
        </div>)
}