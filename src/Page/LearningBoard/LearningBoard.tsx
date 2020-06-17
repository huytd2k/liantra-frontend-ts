import { QuestionOutlined } from "@ant-design/icons";
import { Typography } from "@material-ui/core";
import { Button as Btn, Input, message } from "antd";
import "antd/dist/antd.css";
import React, { useRef, useState } from "react";
import { Badge, Button, Col, Container, Form, Modal, ProgressBar, Row } from "react-bootstrap";
import ReactPlayer from "react-player";
import SentenceCard from "../../Component/SentenceCard";
import { GetTapeData, CREATE_SESSION_MUTATION, SessionData, Session } from "../../Model/Tape";
import "./learning-board.scss";
import { useMutation } from "@apollo/react-hooks";
import { useUser } from "../../Context/UserContext";
import { StringDecoder } from "string_decoder";
import { useHistory, Redirect } from "react-router-dom";
interface LearningBoardProps {
  data: GetTapeData;
}

interface PassStc {
  text: string;
  skipped: boolean;
  hintedIndex?: number[];
}

export default function LearningBoard({ data }: LearningBoardProps) {
  const script = data!.getTapebyId.script || [];
 
  const user = useUser();
  const [score, setScore] = useState(0);

  const [createSession, { error, data: dataSession }] = useMutation<
    { createSession: SessionData },
    { sessionInput: Session }
  >(CREATE_SESSION_MUTATION, {
    variables: {
      sessionInput: {
        score: score,
        userId: parseInt(user.user.userId! as any),
        tapeId: data.getTapebyId.tapeId!
      },
    },
  });
  const [finished, setFinished] = useState(false);

  const link = data!.getTapebyId.ytUrl;

  const [ played, setPlayed ] = useState(0);

  const sPref = useRef<HTMLDivElement>(null);

  const [backed, setBacked] = useState(-1);

  const [hintedIndex, setHintedIndex] = useState<number[]>([]);

  const [showFinishedModal, toogleFinishedModel] = useState(false);

  const [passSentence, setPassSentence] = useState<Array<PassStc>>([]);

  const [showStartBtn, setShowStartBtn] = useState(true);

  const [showLaBtn, setShowLaBtn] = useState(false);

  const [currentPhaseIndex, setCPI] = useState(0);

  const [rightSentences, setRightSentences] = useState(0);

  const [skipped, setSkipped] = useState(0);

  const [revealedIdex, setRevealedIndex] = useState(0);

  let laBtnClasses = showLaBtn ? "laBtn" : "laBtn hide";

  let startBtnClasses = showStartBtn ? "startBtn" : "startBtn hide";

  let showInputClasses = showStartBtn ? "inputPanel hide" : "inputPanel";

  let myPlayer: ReactPlayer;

  const [inputValue, setInputValue] = useState("");

  const ref = (player: ReactPlayer) => {
    myPlayer = player;
  };

  const handleCompleted = () => {
    setScore(rightSentences/script.length * 100)
    toogleFinishedModel(true);
  };

  const handleMessage = (correct: number, word: string | null) => {
    if (correct === 1) {
      message.success(`Correct! It's the word "${word}"`);
    } else if (correct === 2) {
      message.error(`Incorrect!`);
    } else {
      message.warning(`It was the word "${word}"`);
    }
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
    let sentenceStart = script![currentPhaseIndex + 1].start;
    myPlayer.seekTo(sentenceStart - 0.25, "seconds");
    setPlaying(true);
    setCurrentSentence(
      script[currentPhaseIndex + 1]!.text.replace(/[^\w\s]/gi, "")
        .toLowerCase()
        .trim()
        .split(" ")
    );
  };

  const handlePlayAgain = (stcIndex: number) => {
    return () => {
      setPlaying(true);
      setBacked(stcIndex);
      myPlayer.seekTo(script[stcIndex]!.start - 0.25, "seconds");
    };
  };

  const handleListen = () => {
    setBacked(-1);
    let sentenceStart = script[currentPhaseIndex]!.start;
    myPlayer.seekTo(sentenceStart - 0.5, "seconds");
    setPlaying(true);
  };

  const handleHint = () => {
    handleMessage(3, currentSentence.shift() || "");
    setCurrentSentence(currentSentence);
    hintedIndex.push(revealedIdex);
    setHintedIndex(hintedIndex);
    setRevealedIndex(revealedIdex + 1);
    if (currentSentence.length === 0) {
      passSentence.push({
        text: script[currentPhaseIndex]!.text,
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
    if (
      backed !== -1 &&
      state.playedSeconds > script[backed].start + script[backed].duration
    ) {
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

  const handleSession = () => {
    createSession()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(hintedIndex);
    sPref.current!.scrollTop = sPref.current!.scrollHeight;
    setInputValue(e.target.value);
    let inputWord = e.target.value;
    if (inputWord.match(/\s/g)) {
      inputWord = inputWord.replace(/\s/g, "").toLowerCase();
      if (inputWord == currentSentence[0]) {
        handleMessage(1, currentSentence.shift() || "");
        setCurrentSentence(currentSentence);
        setInputValue("");
        setRevealedIndex(revealedIdex + 1);
      } else {
        handleMessage(2, null);
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
  if (dataSession) return <Redirect to="#profile"/>
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
          <Button onClick={() => handleSession()}>Save this session</Button>
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
              url={link}
              controls={true}
              played={played}
            />
          </div>
        </Col>
        <Col>
          <div className="controlPanel">
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
      <div className="processBar">
        <ProgressBar
          variant="success"
          animated
          now={((rightSentences + skipped) / script.length) * 100}
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
        <h4>Current word has : {currentSentence[0].length} character(s)</h4>
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
        <Btn onClick={handleListen} className={laBtnClasses}>
          Listen Again
        </Btn>
        <Form.Label className="guessLabel">Type your guess here:</Form.Label>
        <div className="mainInput">
          <Btn type="primary" className="skipBtn" onClick={handleSkip}>
            Skip sentence
          </Btn>
          <Input
            className="inputLine"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />
          <Btn
            icon={<QuestionOutlined />}
            type="primary"
            className="hintBtn"
            onClick={handleHint}
          >
            Hint a word
          </Btn>
        </div>
      </div>
    </Container>
  );
}
