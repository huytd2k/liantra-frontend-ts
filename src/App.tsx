import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { onError } from "apollo-link-error";
import { HttpLink } from "apollo-link-http";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./App.css";
import MainContainer from "./container/MainContainer";
import { ShowLoginProvider } from "./Context/ShowLoginContext";
import { TapeProvider } from "./Context/TapeContext";
import { UserProvider } from "./Context/UserContext";


const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri: "http://localhost:8000/graphql",
      credentials: "include",
    }),
  ]),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <TapeProvider>
          <ShowLoginProvider>
            <div className="App">
              <header className="App-header">
              </header>
              <MainContainer />
            </div>
          </ShowLoginProvider>
        </TapeProvider>
      </UserProvider>
    </ApolloProvider>
  );
}

export default App;
