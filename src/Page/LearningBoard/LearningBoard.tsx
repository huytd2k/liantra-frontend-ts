import React, { useState, useRef } from "react";
import {
  Alert,
  Button,
  Form,
  ProgressBar,
  Container,
  Row,
  Col,
  Badge,
  ButtonGroup,
  InputGroup,
  Modal,
} from "react-bootstrap";
import ReactPlayer from "react-player";
import "./learning-board.scss";
import { script } from "./testscript";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import { Typography, Slider } from "@material-ui/core";
import SentenceCard from "../../Component/SentenceCard";
interface LearningBoardProps {}

interface PassStc {
  text: string;
  skipped: boolean;
  hintedIndex?: number[];
}

export default function LearningBoard({}: LearningBoardProps) {
  const sPref = useRef<HTMLDivElement>(null);

  const [ backed, setBacked ] = useState(-1);

  const [ hintedIndex, setHintedIndex ] = useState<number[]>([]);

  const sentences = script.length;

  const [showFinishedModal, toogleFinishedModel] = useState(false);

  const [passSentence, setPassSentence] = useState<Array<PassStc>>([]);

  const [showStartBtn, setShowStartBtn] = useState(true);

  const [showLaBtn, setShowLaBtn] = useState(false);

  const [currentPhaseIndex, setCPI] = useState(0);

  const [rightSentences, setRightSentences] = useState(0);

  const [skipped, setSkipped] = useState(0);

  const [popWord, setPopWord] = useState("");

  const [revealedIdex, setRevealedIndex] = useState(0);

  const [correct, setCorrect] = useState(0);

  const [played, setPlayed] = useState(0);

  let laBtnClasses = showLaBtn ? "laBtn" : "laBtn hide";

  let startBtnClasses = showStartBtn ? "startBtn" : "startBtn hide";

  let showInputClasses = showStartBtn ? "inputPanel hide" : "inputPanel";

  let myPlayer: ReactPlayer;

  const [inputValue, setInputValue] = useState("");

  const ref = (player: ReactPlayer) => {
    myPlayer = player;
  };

  const handleCompleted = () => {
    toogleFinishedModel(true);
  };

  const [playing, setPlaying] = useState(false);
  const handleNxSentence = () => {
    /// Scroll sentence panel to bottom
    if (currentPhaseIndex == script.length - 1) {
      handleCompleted();
      return;
    }
    setPassSentence(passSentence);
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

  const handlePlayAgain = (stcIndex: number) => {
    return () => {
      setPlaying(true);
      setBacked(stcIndex);
    myPlayer.seekTo(script[stcIndex].start -.25, "seconds")}
    ;
    
  }

  const handleListen = () => {
    setBacked(-1);
    let sentenceStart = script[currentPhaseIndex].start;
    myPlayer.seekTo(sentenceStart - 0.5, "seconds");
    setPlaying(true);
  };

  const handleHint = () => {
    setPopWord(currentSentence.shift() || "");
    setCurrentSentence(currentSentence);
    setCorrect(3);
    hintedIndex.push(revealedIdex);
    setHintedIndex(hintedIndex)
    setRevealedIndex(revealedIdex + 1);
    if (currentSentence.length === 0) {
        passSentence.push({
          text: script[currentPhaseIndex].text,
          skipped: false,
          hintedIndex: hintedIndex,
        });
      setHintedIndex([]);
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
    if (state.playedSeconds > script[0].start) {
      setShowLaBtn(true);
    }
    let sentenceDur = script[currentPhaseIndex].duration;
    if(backed !== -1 && state.playedSeconds > script[backed].start + script[backed].duration) {
      setPlaying(false);
    }

    if (state.playedSeconds > sentenceDur + script[currentPhaseIndex].start) {
      setPlaying(false);
    }
  };

  const handleSkip = () => {
    passSentence.push({ text: script[currentPhaseIndex].text, skipped: true });
    handleNxSentence();
    setSkipped(skipped + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(hintedIndex);
    sPref.current!.scrollTop = sPref.current!.scrollHeight;
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
        passSentence.push({
          text: script[currentPhaseIndex].text,
          skipped: false,
          hintedIndex: hintedIndex,
        });
        setHintedIndex([]);
        handleNxSentence();
        setRightSentences(rightSentences + 1);
      }
    }
  };

  return (
    <Container fluid className="learningBoard">
      <Modal show={showFinishedModal}>
        <Modal.Header>You have finished !</Modal.Header>
        <Modal.Body>
        <div className="statusPanel">
            <Typography id="continous-slider" gutterBottom>
              <Badge variant="primary">
                Completed sentences {rightSentences + skipped}/{script.length}
              </Badge>
            </Typography>
            <Typography id="continous-slider" gutterBottom>
              <Badge variant="success">
                Correct sentences {rightSentences}/{script.length}
              </Badge>
            </Typography>
            <Typography id="continous-slider" gutterBottom>
              <Badge variant="danger">
                Skipped sentences {skipped}/{script.length}
              </Badge>
            </Typography>
            <Typography id="continous-slider" gutterBottom>
              <Badge variant="warning">Hinted words 0</Badge>
            </Typography>
          </div>
          <Button>Save this session</Button>
        </Modal.Body>
      </Modal>
      <Row>
        <Col>
          <div ref={sPref} className="sentencePanel">
            {passSentence.map((line, index) => (
              <SentenceCard
                index={index}
                key={index}
                text={line.text}
                variant={line.skipped}
                hintedIndex={line.hintedIndex}
                handlePlayAgain={handlePlayAgain(index)}
              />
            ))}
          </div>
        </Col>
        <Col xs={10.5}>
          <div className="ytPlayer">
            <ReactPlayer
              onPlay={() => {
                setPlaying(true);
                setShowStartBtn(false);
              }}
              ref={ref}
              onReady={() => setPlayed(0)}
              progressInterval={0.05}
              onProgress={handleOnProgess}
              playing={playing}
              url="https://www.youtube.com/watch?v=arj7oStGLkU?rel=0"
              controls={true}
            />
          </div>
        </Col>
        <Col>
          <div className="controlPanel">
            <div className="volumePanel">
              <Typography id="continous-slider" gutterBottom>
                Volume
              </Typography>
              <Slider></Slider>
            </div>
            <div className="ratePanel">
              <Typography id="continous-slider" gutterBottom>
                Video speed
              </Typography>
              <ButtonGroup aria-label="Basic example">
                <Button variant="outline-primary"> 0.5</Button>
                <Button variant="outline-primary">0.75</Button>
                <Button variant="outline-primary">Standard</Button>
                <Button variant="outline-primary">1.25</Button>
                <Button variant="outline-primary">1.5</Button>
              </ButtonGroup>
            </div>
            <div className="statusPanel">
              <Typography id="continous-slider" gutterBottom>
                <Badge variant="primary">
                  Completed sentences {rightSentences + skipped}/{script.length}
                </Badge>
              </Typography>
              <Typography id="continous-slider" gutterBottom>
                <Badge variant="success">
                  Correct sentences {rightSentences}/{script.length}
                </Badge>
              </Typography>
              <Typography id="continous-slider" gutterBottom>
                <Badge variant="danger">
                  Skipped sentences {skipped}/{script.length}
                </Badge>
              </Typography>
              <Typography id="continous-slider" gutterBottom>
                <Badge variant="warning">Hinted words 0</Badge>
              </Typography>
            </div>
          </div>
        </Col>
      </Row>
            <h4>Current word has : {currentSentence[0].length} characters</h4>
      <div className="processBar">
        <ProgressBar
          variant="success"
          animated
          now={((rightSentences + skipped) / sentences) * 100}
        />
      </div>
      <Button
        className={startBtnClasses}
        onClick={() => {
          setShowStartBtn(false);
          setPlaying(true);
        }}
      >
        {" "}
        Start learning{" "}
      </Button>

      <div className={showInputClasses}>
        <Form.Label>Current sentence</Form.Label>
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
        <Button onClick={handleListen} className={laBtnClasses}>
          Listen Again
        </Button>
        <Form.Label className="guessLabel">Type your guess here:</Form.Label>
        <InputGroup>
          <InputGroup.Prepend>
            <Button className="skipBtn" variant="warning" onClick={handleSkip}>
              Skip sentence
            </Button>
          </InputGroup.Prepend>
          <Form.Control
            className="inputLine"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />
          <InputGroup.Append>
            <Button
              className="hintBtn"
              variant="outline-success"
              onClick={handleHint}
            >
              <EmojiObjectsIcon />
              Hint a word
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
      <LearnAlert {...{ correct, popWord }} />
    </Container>
  );
}
interface alertProps {
  correct: number;
  popWord?: string;
}

function LearnAlert({ correct, popWord }: alertProps) {
  return (
    <div>
      {correct === 0 ? null : correct === 1 ? (
        <Alert variant="success">Correct it's the word "{popWord}"</Alert>
      ) : correct === 2 ? (
        <Alert variant="danger"> Incorrect!</Alert>
      ) : (
        <Alert variant="warning"> It was the word "{popWord}" </Alert>
      )}
    </div>
  );
}
