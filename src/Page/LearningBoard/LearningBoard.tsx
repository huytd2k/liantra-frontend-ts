import React, { useRef, useState } from "react";
import "./learning-board.scss";
import Youtube from "react-youtube";
import ReactPlayer from "react-player";
import { Button, Form, Alert } from "react-bootstrap";
import { script } from "./testscript";
interface LearningBoardProps {}

export default function LearningBoard({}: LearningBoardProps) {
  const [currentPhaseIndex, setCPI] = useState(0);

  const [popWord, setPopWord] = useState("");

  const [revealedIdex, setRevealedIndex] = useState(0);

  const [correct, setCorrect] = useState<boolean | undefined>(undefined);

  const [played, setPlayed] = useState(0);

  let myPlayer: ReactPlayer;

  const [inputValue, setInputValue] = useState("");

  const ref = (player: ReactPlayer) => {
    myPlayer = player;
  };

  const [playing, setPlaying] = useState(false);
  const handleNxSentence = () => {
    setRevealedIndex(0);
    setCPI(currentPhaseIndex + 1);
    let sentenceStart = script[currentPhaseIndex + 1].start;
    myPlayer.seekTo(sentenceStart - 0.25, "seconds");
    setPlaying(true);
    setCurrentSentence(
      script[currentPhaseIndex + 1].text
        .replace(/[^\w\s]/gi, "")
        .toLowerCase()
        .split(" ")
    );
  };

  const handleListen = () => {
    let sentenceStart = script[currentPhaseIndex].start;
    myPlayer.seekTo(sentenceStart - 0.5, "seconds");
    setPlaying(true);
  };

  const [currentSentence, setCurrentSentence] = useState(
    script[currentPhaseIndex].text
      .replace(/[^\w\s]/gi, "")
      .toLowerCase()
      .split(" ")
  );

  const handleOnProgess = (state: any) => {
    let sentenceDur = script[currentPhaseIndex].duration;
    console.log(state.playedSeconds - sentenceDur - script[currentPhaseIndex].start);
    if (state.playedSeconds > sentenceDur + script[currentPhaseIndex].start) {
        setPlaying(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(currentSentence);
    setInputValue(e.target.value);
    let inputWord = e.target.value;
    if (inputWord.match(/\s/g)) {
      inputWord = inputWord.replace(/\s/g, "").toLowerCase();
      if (inputWord == currentSentence[0]) {
        setPopWord(currentSentence.shift() || "");
        setCurrentSentence(currentSentence);
        setCorrect(true);
        setInputValue("");
        setRevealedIndex(revealedIdex+1);
      } else {
        setCorrect(false);
        setInputValue("");
      }
      if (currentSentence.length === 0) handleNxSentence();
    }
  };

  return (
    <div className="learnBoard">
      <div className="ytPlayer">
        <ReactPlayer
            onPlay ={()=> setPlaying(true)}
          ref={ref}
          onReady={() => setPlayed(0)}
          progressInterval={0.05}
          onProgress={handleOnProgess}
          playing={playing}
          url="https://www.youtube.com/watch?v=arj7oStGLkU"
          controls={false}
        />
        <p>This is learning board</p>
      </div>
      <Button onClick={handleNxSentence}> Next sentence</Button>
  { (correct === undefined) ? null : (correct === true) ? <Alert variant="success">Correct it's the word "{popWord}"</Alert> : <Alert variant="danger"> Incorrect!</Alert>}
      <Button onClick={handleListen}> Listen</Button>
      <Form.Control
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
      <Form.Control type="text" value={script[currentPhaseIndex].text.split(" ").slice(0,revealedIdex).join(" ")} />
    </div>
  );
}
