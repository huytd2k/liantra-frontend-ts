import React from 'react'
import './learning.scss'
import { useQuery } from '@apollo/react-hooks';
import { GET_TAPE_BY_ID_QUERY, Tape, GetTapeData } from '../../Model/Tape';
import LearningBoard from '../LearningBoard';
import { useParams } from 'react-router-dom';

interface LearningProps {
}
interface tapeInput {
    tapeId: number
}


export default function Learning({}: LearningProps) {
    const {tapeId} = useParams()
  const {loading, error, data } = useQuery<GetTapeData,tapeInput>(GET_TAPE_BY_ID_QUERY, {
    variables: {tapeId: parseInt(tapeId!)} },
  );
  if (loading ) return <p>Loading</p>
  if (error) return <p>{error}</p>
  return <LearningBoard data={data as GetTapeData} />
}