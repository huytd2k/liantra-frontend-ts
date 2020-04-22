import { ApolloProvider } from "@apollo/react-hooks";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { HashRouter as Router, Route, Switch, useParams } from "react-router-dom";
import "./App.css";
import NavBar from "./Component/NavBar";
import { ShowLoginProvider } from "./Context/ShowLoginContext";
import { TapeProvider } from "./Context/TapeContext";
import FrontPage from "./Page/FrontPage";
import TapeFeed from "./Page/TapeFeed";
import TapePage from "./Page/TapePage";

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import LearningBoard from "./Page/LearningBoard";
import ProfilePage from "./Page/ProfilePage";
import LoginPage from "./Page/LoginPage";
import RegisterPage from "./Page/RegisterPage";
import Footer from "./Component/Footer";
import Learning from "./Page/Learning";

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
  const {tapeId} = useParams();
  return (
    <ApolloProvider client={client}>
      <TapeProvider>
        <ShowLoginProvider>
            <div className="App">
              <header className="App-header">
                <Switch>
                  <Route exact path="#/login">
                    <LoginPage/>
                  </Route>
                  <Route exact path="/register">
                    <RegisterPage/>
                  </Route>
                  <Route exact path="/">
                    <NavBar />
                    <FrontPage />
                  </Route>
                  <Route path="/tape">
                    <NavBar />
                    <TapePage />
                  </Route>
                  <Route path="/feed">
                    <NavBar />
                    <TapeFeed />
                  </Route>
                  <Route path="/learn/:tapeId">
                    <NavBar />
                    <Learning/>
                    <Footer />
                  </Route>
                  <Route path="/profile">
                    <NavBar />
                    <ProfilePage />
                  </Route>
                </Switch>
              </header>
            </div>
        </ShowLoginProvider>
      </TapeProvider>
    </ApolloProvider>
  );
}

export default App;
