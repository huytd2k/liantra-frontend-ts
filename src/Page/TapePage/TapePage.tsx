import React, { useState, useEffect, useContext, MouseEvent } from "react";
import { Form, FormGroup, Container, Button, Alert } from "react-bootstrap";
import { TapeContext } from "../../Context/TapeContext";
import { fetchAllTape } from "../../API/TapeAPI";
import TapeContainer from "../../Component/TapeContainer";
import { useMutation } from "@apollo/react-hooks";
import { TapeData, Tape, ADD_TAPE_MUTATION } from "../../Model/Tape";
import { REGISTER_MUTATION } from "../../Model/UserInput";
export default function TapePage() {
  const tryparseJson = (str: string) => {
    try {
      return JSON.parse(str);
    } catch (error) {
      return null;
    }
  };

  const [levelStr, setLevel] = useState("");
  const level = parseInt(levelStr);
  const [title, setTitle] = useState("");
  const [ytUrl, setYtUrl] = useState("");
  const [description, setDescription] = useState("");
  const [script, setScript] = useState("");
  const [createTape, { error, data }] = useMutation<
    { createTape: TapeData },
    { tapeInput: Tape }
  >(ADD_TAPE_MUTATION, {
    variables: {
      tapeInput: {
        title,
        script: tryparseJson(script),
        ytUrl,
        description,
        level,
      },
    },
  });



  return (
    <div className="TapePage">
      <Container>
        <Form>
          <FormGroup>
            <Form.Control
              value={levelStr}
              placeholder="level"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setLevel(e.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Form.Control
              value={title}
              placeholder="title"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setTitle(e.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Form.Control
              value={ytUrl}
              placeholder="youtube link"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setYtUrl(e.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Form.Control
              value={description}
              placeholder="description"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setDescription(e.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Form.Control
              value={script}
              placeholder="script"
              as="textarea"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setScript(e.target.value);
              }}
            />
          </FormGroup>
          <Button
            onClick={() => {
              createTape();
            }}
          >
            Submit
          </Button>
          {/* <Button type="submit" onClick={handleGetPost}>Get Tapes</Button> */}
        </Form>
      </Container>
    </div>
  );
}
