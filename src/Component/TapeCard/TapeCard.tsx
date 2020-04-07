/* eslint-disable no-unused-expressions */
import React from 'react'
import './TapeCard.css'
import { Card, Button } from 'react-bootstrap'
import { useTape } from '../../Context/TapeContext'
import { deleteTapeById, fetchAllTape } from '../../API/TapeAPI';
import TapeCardProps from './TapeCardProps';

export default function TapeCard(props: TapeCardProps) {
    const {tapeList, setTapeList} = useTape();
    const deleteHandler = (e : React.MouseEvent<HTMLElement, MouseEvent>) => {
        (async () => {
            await deleteTapeById(setTapeList, props.tape.id);
            await fetchAllTape(setTapeList);
        })();
    }

    return (
        <div className="tapeCard">
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{props.tape.title}</Card.Title>
                    <Card.Text>
                        {props.tape.description}
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                    <Button variant="danger" onClick={deleteHandler}>Delete</Button>
                </Card.Body>
            </Card>
        </div>
    )
}
