import React from 'react'
import {Col} from 'react-bootstrap' 
import './LevelCard.css'
import Star from './../../star.svg'
import { LevelCardProps } from './LevelCardProps'


export default function LevelCard(props : LevelCardProps) {
    let stars = []
    for (let i = 1; i <= props.level; i++) {
        stars.push(<img alt="star" className="star" src={Star}></img>)
    }
    return (
        <Col>
            <div className="levelCard" >
                <h2>{props.title}</h2>
                {stars}
                <p className="cardDescription">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercita</p>
            </div>
        </Col>
    )
}
