/* eslint-disable no-unused-expressions */
import React from 'react'
import './TapeCard.scss'
import { Card, Button } from 'react-bootstrap'
import { useTape } from '../../Context/TapeContext'
import { deleteTapeById, fetchAllTape } from '../../API/TapeAPI';
import TapeCardProps from './TapeCardProps';
import { Link } from 'react-router-dom';

export default function TapeCard(props: TapeCardProps) {
    const {tapeList, setTapeList} = useTape();
    const deleteHandler = (e : React.MouseEvent<HTMLElement, MouseEvent>) => {
        (async () => {
            await deleteTapeById(setTapeList, props.tape.id);
            await fetchAllTape(setTapeList);
        })();
    }

    return (
        <div >
            <Card className="tapeCard">
                <Card.Body className="cardBody">
                    <Card.Title>{props.tape.title}</Card.Title>
                    <Card.Text>
                        {props.tape.description}
                    </Card.Text>
                    {props.tape.tags.map(tag => 
                        <Link className="tagLink" to="#">
                                {`#${tag}`}
                        </Link>
                        )}
                </Card.Body>
                <Card.Img className="thumbnail" src="https://img.youtube.com/vi/7NOSDKb0HlU/0.jpg"></Card.Img>
            </Card>
        </div>
    )
}
