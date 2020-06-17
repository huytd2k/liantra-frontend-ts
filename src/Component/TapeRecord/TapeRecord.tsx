import React from "react";
import "./tape-record.scss";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Session } from "../../Model/Tape";

interface TapeRecordProps {
  session: Session;
}
export default function TapeRecord(props: TapeRecordProps) {
    console.log(props.session.score)
  return (
    <div>
      <Link to={`/learn/${props.session.tape!.tapeId}`}>
        <Card className="tapeCard">
          <Card.Body className="cardBody">
            <Card.Title>{props.session.tape!.title}</Card.Title>
            <Card.Text>score :{props.session.score}</Card.Text>
          </Card.Body>
          <Card.Img
            className="thumbnail"
            src={`https://img.youtube.com/vi/${props.session.tape!.ytUrl.slice(
              props.session.tape!.ytUrl.length - 11
            )}/0.jpg`}
          ></Card.Img>
        </Card>
      </Link>
    </div>
  );
}
