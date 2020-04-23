import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { GetTapeData, GET_TAPE_BY_ID_QUERY } from "../../Model/Tape";
import { User } from "../../Model/UserInput";
import LearningBoard from "../LearningBoard";
import "./learning.scss";
import { useUser } from "../../Context/UserContext";

interface tapeInput {
  tapeId: number;
}

export default function Learning() {
  const {user} = useUser();
  const { tapeId } = useParams();
  const { loading, error, data } = useQuery<GetTapeData, tapeInput>(
    GET_TAPE_BY_ID_QUERY,
    {
      variables: { tapeId: parseInt(tapeId!) },
    }
  );
  if (!user.isLogged) return <Redirect to="/login" />
  if (loading) return <p>Loading</p>;
  if (error) return <p>{error}</p>;
  return <LearningBoard data={data as GetTapeData} />;
}
