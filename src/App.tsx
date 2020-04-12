import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./Component/NavBar";
import FrontPage from "./Page/FrontPage";
import { ShowLoginProvider } from "./Context/ShowLoginContext";
import { TapeProvider } from "./Context/TapeContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TapePage from "./Page/TapePage";
import TapeFeed from "./Page/TapeFeed";

function App() {
  return (
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
  );
}

export default App;
