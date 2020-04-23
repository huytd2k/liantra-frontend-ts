import { gql } from "apollo-boost";

export interface User {
  username?: string;
  userId? :number;
  password?: string;
  email?: string;
}
export interface MeResponseData {
  isOk: boolean;
  user: User;
}
export interface UserResponseData {
  me: MeResponseData
}

export class ResgisterResponseData {
    isOk!: boolean;
    error?: string ;
    userInfo?: User; 
    errCode?: number;
}

export class LoginReponseData {
  userInfo!: User;
  isOk!: boolean;

}

export const REGISTER_MUTATION = gql`
  mutation register($userInput: RegisterUserInput!){
    register(userInput: $userInput) {
        isOk
        error
        userInfo {
            userId
            username
            email
        }
    }
  }
`;

export const ME_QUERY = gql`
  query {
      me {
          isOk
          user {
            username
          }
      }
  }

`;

export const LOGOUT_MUTATION = gql`
  mutation {
    logOut
  }
`
export const LOGIN_MUTATION = gql`
  mutation login($userInput: RegisterUserInput!) {
    login(userInput: $userInput) {
      isOk
      userInfo {
        username
        userId
      }
    }
  }
`;
