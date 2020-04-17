import { ApolloProvider } from "@apollo/react-hooks";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import NavBar from "./Component/NavBar";
import { ShowLoginProvider } from "./Context/ShowLoginContext";
import { TapeProvider } from "./Context/TapeContext";
import FrontPage from "./Page/FrontPage";
import TapeFeed from "./Page/TapeFeed";
import TapePage from "./Page/TapePage";


import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import LearningBoard from "./Page/LearningBoard";

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri: 'http://localhost:8000/graphql',
      credentials: 'include',
    })
  ]),
  cache: new InMemoryCache()
});


function App() {
  return (
    <ApolloProvider client={client}>
      <TapeProvider>
        <ShowLoginProvider>
          <Router>
            <div className="App">
              <header className="App-header">
                <NavBar />
                <Switch>
                  <Route exact path="/">
                    <FrontPage />
                  </Route>
                  <Route path="/tape">
                    <TapePage />
                  </Route>
                  <Route path="/feed">
                    <TapeFeed />
                  </Route>
                  <Route path="/learn">
                    <LearningBoard />
                  </Route>
                </Switch>
              </header>
            </div>
          </Router>
        </ShowLoginProvider>
      </TapeProvider>
    </ApolloProvider>
  );
}

export default App;
