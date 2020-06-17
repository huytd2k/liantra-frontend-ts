/* eslint-disable no-unused-expressions */
import React from 'react'
import './TapeCard.scss'
import { Card, Button } from 'react-bootstrap'
import { useTape } from '../../Context/TapeContext'
import { deleteTapeById, fetchAllTape } from '../../API/TapeAPI';
import TapeCardProps from './TapeCardProps';
import { Link } from 'react-router-dom';

export default function TapeCard(props: TapeCardProps) {
    return (
        <div >
            <Link to={`/learn/${props.tape.tapeId}`}>
                <Card className="tapeCard">
                    <Card.Body className="cardBody">
                        <Card.Title>{props.tape.title}</Card.Title>
                        <Card.Text>
                            Level: {props.tape.level}
                        </Card.Text>
                        <Card.Text>
                            {props.tape.description}
                        </Card.Text>
                        {/* {props.tape.tags.map(tag => 
                            <Link className="tagLink" to="#">
                                    {`#${tag}`}
                            </Link>
                            )} */}
                    </Card.Body>
                    <Card.Img className="thumbnail" src={`https://img.youtube.com/vi/${props.tape.ytUrl.slice(props.tape.ytUrl.length -11)}/0.jpg`}></Card.Img>
                </Card>
            </Link>
        </div>
    )
}
