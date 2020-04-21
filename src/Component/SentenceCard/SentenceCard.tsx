import React from "react";
import { Alert } from "react-bootstrap";
import "./sentence-card.scss";

interface SentenceCardProps {
  text: string;
  index: number;
  variant?: boolean;
}

export default function SentenceCard({ text, index, variant }: SentenceCardProps) {
    const style = variant ? "danger" : "success";
  return (
    <Alert variant={style} className="sentenceCard">
      {index+1}
      {" . "}
      {text}
    </Alert>
  );
}
