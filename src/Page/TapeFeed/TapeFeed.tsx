import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import ProfileCard from "../../Component/ProfileCard";
import TapeCard from "../../Component/TapeCard";
import { GET_TAPE_QUERY, TapeData } from "../../Model/Tape";
import "./tape-feed.scss";
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

interface TapeFeedProps {}

export default function TapeFeed({}: TapeFeedProps) {
  const { loading, data, error } = useQuery<TapeData>(GET_TAPE_QUERY);
  if (loading) return <p>loading</p>
  return (
    <Container>
      {" "}
      <Row>
        {" "}
        <Col xs={8}>
          {" "}
          {data!.tapes.map((tape) => (
            <TapeCard key={tape.tapeId} tape={tape} />
          ))}
        </Col>
        <Col xs={4}>
          <ProfileCard />
        </Col>
      </Row>
    </Container>
  );
}
