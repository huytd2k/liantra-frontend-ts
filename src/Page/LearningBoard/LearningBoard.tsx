import React, { useRef, useState } from "react";
import "./learning-board.scss";
import Youtube from "react-youtube";
import ReactPlayer from "react-player";
import { Button, Form, Alert, ProgressBar, Fade } from "react-bootstrap";
import { script } from "./testscript";
interface LearningBoardProps {}

export default function LearningBoard({}: LearningBoardProps) {
  const sentences = script.length;

  const [showLaBtn, setShowLaBtn] = useState(false);

  const [currentPhaseIndex, setCPI] = useState(0);

  const [rightSentences, setRightSentences] = useState(0);

  const [skipped, setSkipped] = useState(0);

  const [popWord, setPopWord] = useState("");

  const [revealedIdex, setRevealedIndex] = useState(0);

  const [correct, setCorrect] = useState(0);

  const [played, setPlayed] = useState(0);

  let classes = showLaBtn ? "laBtn" : "laBtn hide";
  
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
        .trim()
        .split(" ")
    );
  };

  const handleListen = () => {
    let sentenceStart = script[currentPhaseIndex].start;
    myPlayer.seekTo(sentenceStart - 0.5, "seconds");
    setPlaying(true);
  };

  const handleHint = () => {
    setPopWord(currentSentence.shift() || "");
    setCurrentSentence(currentSentence);
    setCorrect(3);
    setRevealedIndex(revealedIdex + 1);
    if (currentSentence.length === 0) {
      handleNxSentence();
      setRightSentences(rightSentences + 1);
    }
  };

  const [currentSentence, setCurrentSentence] = useState(
    script[currentPhaseIndex].text
      .replace(/[^\w\s]/gi, "")
      .trim()
      .toLowerCase()
      .split(" ")
  );

  const handleOnProgess = (state: any) => {
    if(state.playedSeconds >  script[0].start) {
        setShowLaBtn(true);
    }
    let sentenceDur = script[currentPhaseIndex].duration;
    if (state.playedSeconds > sentenceDur + script[currentPhaseIndex].start) {
      setPlaying(false);
    }
  };

  const handleSkip = () => {
    handleNxSentence();
    setSkipped(skipped + 1);
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
        setCorrect(1);
        setInputValue("");
        setRevealedIndex(revealedIdex + 1);
      } else {
        setCorrect(2);
        setInputValue("");
      }
      if (currentSentence.length === 0) {
        handleNxSentence();
        setRightSentences(rightSentences + 1);
      }
    }
  };

  return (
    <div className="learnBoard">
      <div className="ytPlayer">
        <ReactPlayer
          onPlay={() => setPlaying(true)}
          ref={ref}
          onReady={() => setPlayed(0)}
          progressInterval={0.05}
          onProgress={handleOnProgess}
          playing={playing}
          url="https://www.youtube.com/watch?v=arj7oStGLkU?rel=0"
          controls={false}
        />
        <p>This is learning board</p>
      </div>
      <Button onClick={handleSkip}> Next sentence</Button>
      
      {correct === 0 ? null : correct === 1 ? (
        <Fade in={true}>
            <Alert variant="success">Correct it's the word "{popWord}"</Alert>
        </Fade>
      ) : correct === 2 ? (
        <Fade in={true}>
            <Alert variant="danger"> Incorrect!</Alert>
        </Fade>
      ) : (
        <Fade in={true}>
            <Alert variant="warning"> It was the word "{popWord}" </Alert>
        </Fade>
      )}
      
      
      <Button onClick={handleListen} className={classes}> Listen Again</Button>
      
      
      <Button onClick={handleHint}> Hint a word</Button>
      
      <Form.Control
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
      
      <Form.Control
        className="curLine"
        type="text"
        value={
          script[currentPhaseIndex].text
            .split(" ")
            .slice(0, revealedIdex)
            .join(" ") +
          " " +
          script[currentPhaseIndex].text
            .split(" ")
            .slice(revealedIdex)
            .map((word) => word.replace(/[^\w\s]/gi, "").replace(/\w/gi, "*"))
            .join("  ")
        }
      />
      <ProgressBar
        variant="success"
        animated
        now={((rightSentences + skipped) / sentences) * 100}
      />
    </div>
  );
}
