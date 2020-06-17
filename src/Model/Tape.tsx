import { gql } from "apollo-boost";
interface line {
    text: string;
    start: number;
    duration: number;
}
export interface Tape {
  tapeId?: number;
  title: string;
  level: number;
  script: line[];
  description: string;
  ytUrl: string;
}
export interface TapeData {
  tapes: Tape[];
  isOk: boolean;
}
export interface Session {
  sessionId?: number,
  tapeId: number
  score: number,
  userId: number,
  tape?: Tape,
}
export interface SessionData {
  isOk: boolean,
  sessions: Session[],
}

export interface GetSessionData {
  getAllSession: SessionData
}
export interface SessionData {
  isOk: boolean,
  session: Session,
}

export interface GetTapeData {
  getTapebyId: Tape;
}
export const GET_TAPE_QUERY = gql`
  query {
    tapes {
      tapeId
      title
      level
      script {
        text
      }
      description
      ytUrl
    }
  }
`;

export const GET_TAPE_BY_ID_QUERY = gql`
  query($tapeId: Float!) {
    getTapebyId(tapeId: $tapeId) {
      tapeId
      title
      level
      script {
        text
        start
        duration
      }
      description
      ytUrl
    }
  }
`;

export const GET_TAPE_BY_LEVEL = gql`
  query($level: Float!) {
    getTapebyLevel(level: $level) {
      tapeId
      title
      level
      script {
        text
        start
        duration
      }
      description
      ytUrl
    }
  }
`;
export const ADD_TAPE_MUTATION = gql`
  mutation addTape($tapeInput: TapeInput!) {
    addTape(tape: $tapeInput) {
      isOk
    }
  }
`;

export const CREATE_SESSION_MUTATION = gql`
  mutation createSession($sessionInput: SessionInput!) {
    createSession(sessionInput: $sessionInput) {
       isOk
       session {
         sessionId
       }
       error
    }
  }
`;

export const GET_SESSION_QUERY = gql`
  query($userId: Int!) {
    getAllSession(userId: $userId) {
    isOk
    sessions {
      sessionId
      score
      tape {
        ytUrl
        tapeId
        title
      }
    }
  }
  }
`;
