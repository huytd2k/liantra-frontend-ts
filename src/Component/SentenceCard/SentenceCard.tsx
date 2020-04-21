import React from "react";
import { Alert } from "react-bootstrap";
import "./sentence-card.scss";
import backwardBtn from './play-button.png'
interface SentenceCardProps {
  text: string;
  index: number;
  variant?: boolean;
  hintedIndex?: number[];
  handlePlayAgain: () => void;
}

export default function SentenceCard({ text, index, variant, hintedIndex, handlePlayAgain }: SentenceCardProps) {
    hintedIndex = hintedIndex || [];
    const style = variant ? "danger" : hintedIndex?.length == 0 ? "success" : "warning";
    const wordArr = text
      .replace(/[^\w\s]/gi, "")
      .trim()
      .split(" ")
  return (
    <Alert  variant={style} className="sentenceCard">
      {index+1}
      {" . "}
      {wordArr.map((word,index) => {
        if(hintedIndex!.indexOf(index) > -1) {
        return <strong >{word} </strong>
        } else {
          return <span>{word} </span>
        }
      })} 

      {"  "}
      <img onClick={handlePlayAgain as any} className="backwardBtn" src={backwardBtn} alt="backward"></img>
    </Alert>
  );
}
