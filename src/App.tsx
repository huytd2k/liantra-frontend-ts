import ApolloClient from "apollo-client";
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
import { ApolloProvider } from "@apollo/react-hooks";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-boost";
const link = createHttpLink({
  uri: "http://localhost:8000/graphql"
});
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
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
