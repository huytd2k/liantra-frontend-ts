import React from "react";
import "./history-board.scss";
import { useUser } from "../../Context/UserContext";
import { useQuery } from "@apollo/react-hooks";
import { GetSessionData, GET_SESSION_QUERY } from "../../Model/Tape";
import TapeRecord from "../TapeRecord";

interface HistoryBoardProps {}

interface sessionInput {
  userId: number;
}

export default function HistoryBoard({}: HistoryBoardProps) {
  const user = useUser();
  const { loading, error, data } = useQuery<GetSessionData, sessionInput>(
    GET_SESSION_QUERY,
    {
      variables: { userId: parseInt(user.user.userId! as any) },
    }
  );
  if (loading) return <p>loading</p>;
  if (data) {
      console.log(data.getAllSession.sessions)
    return (
      <div>
        {data.getAllSession.sessions.map((session) => (
          <TapeRecord key={session.sessionId} session={session} />
        ))}
      </div>
    );
  }
  return <div></div>;
}
