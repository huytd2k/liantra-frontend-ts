import { gql } from "apollo-boost";

export interface Tape {
  id: number;
  title: string;
  level: number;
  script: string;
  description: string;
  ytUrl: string;
}
export interface TapeData {
  tapes: Tape[];
}

export const GET_TAPE_QUERY = gql`
 
    query {tapes 
        {
            tapeId
            title
            level
            script
            description
            ytUrl
        }}
    
 
`;
