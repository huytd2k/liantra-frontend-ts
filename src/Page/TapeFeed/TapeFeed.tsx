import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import ProfileCard from "../../Component/ProfileCard";
import TapeCard from "../../Component/TapeCard";
import { Tape, GET_TAPE_QUERY, TapeData } from "../../Model/Tape";
import "./tape-feed.scss";
import { useQuery } from "@apollo/react-hooks";

interface TapeFeedProps {}
// const mockTape: Tape[] = [
//   {
//     id: 1,
//     title: "Some title",
//     description: "Some descrition",
//     script: "asdasdasdas",
//     level: 3,
//     ytUrl: "youtube.com",
//   },
//   {
//     id: 2,
//     title: "Some title",
//     description: "Some description",
//     script: "asdasdasdas",
//     level: 3,
//     ytUrl: "youtube.com",
//   },
//   {
//     id: 3,
//     title: "Some title",
//     description: "Some description",
//     script: "some ",
//     level: 3,
//     ytUrl: "youtube.com",
//   },
//   {
//     id: 2,
//     title: "Some title",
//     description: "Some description",
//     script: "asdasdasdas",
//     level: 3,
//     ytUrl: "youtube.com",
//   },
//   {
//     id: 2,
//     title: "Some title",
//     description: "Some description",
//     script: "asdasdasdas",
//     level: 3,
//     ytUrl: "youtube.com",
//   },
//   {
//     id: 2,
//     title: "Some title",
//     description: "Some description",
//     script: "asdasdasdas",
//     level: 3,
//     ytUrl: "youtube.com",
//   },
// ];

export default function TapeFeed({}: TapeFeedProps) {
  const { loading, data, error } = useQuery<TapeData>(GET_TAPE_QUERY);
  if (loading) return <p>loading</p>
  console.log(data);
  return (
    <Container>
      {" "}
      <Row>
        {" "}
        <Col xs={8}>
          {" "}
          <h1> Choose your favorite tape to learn :</h1>
          {data!.tapes.map((tape) => (
            <TapeCard key={tape.id} tape={tape} />
          ))}
        </Col>
        <Col xs={4}>
          <ProfileCard />
        </Col>
      </Row>
    </Container>
  );
}
