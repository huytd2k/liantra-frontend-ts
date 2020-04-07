import React from 'react'
import TapeCard from '../TapeCard';
import { Tape } from '../../Model/Tape';

interface ctnProps {
    tapes: Tape[]
}


export default function TapeContainer(props: ctnProps ) {
    const TapeCards = props.tapes.map(
        (_tape) => <TapeCard tape={_tape} />
    );
    return <div className="tapeCtn">{TapeCards}</div>
}




