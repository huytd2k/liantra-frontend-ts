import { gql } from "apollo-boost";

export interface User {
  username: string;
  password?: string;
  email: string;
}
export interface UserResponseData {
  isOk: boolean;
  me: User;
}

export const REGISTER_MUTATION = gql`
  mutation register($userInput: RegisterUserInput!){
    register(userInput: $userInput) {
        isOk
        error
        userInfo {
            username
            email
        }
    }
  }
`;

export const ME_QUERY = gql`
  query {
      me {
          username
      }
  }

`;

export const LOGOUT_MUTATION = gql`
  mutation {
    logOut
  }
`
