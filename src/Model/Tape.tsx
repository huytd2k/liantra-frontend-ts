import { gql } from "apollo-boost";

export interface Tape {
  id?: number;
  title: string;
  level: number;
  script: {
    text: string;
    start: number;
    duration: number;
  };
  description: string;
  ytUrl: string;
}
export interface TapeData {
  tapes: Tape[];
  isOk: boolean;
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

export const ADD_TAPE_MUTATION = gql`
  mutation addTape($tapeInput: TapeInput!) {
    addTape(tape: $tapeInput) {
      isOk
    }
  }
`;
