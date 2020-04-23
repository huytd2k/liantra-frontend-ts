import React from "react";
import "./main-container.scss";
import { Switch, Route } from "react-router-dom";
import LoginPage from "../../Page/LoginPage";
import RegisterPage from "../../Page/RegisterPage";
import NavBar from "../../Component/NavBar";
import FrontPage from "../../Page/FrontPage";
import TapePage from "../../Page/TapePage";
import TapeFeed from "../../Page/TapeFeed";
import Learning from "../../Page/Learning";
import Footer from "../../Component/Footer";
import ProfilePage from "../../Page/ProfilePage";
import { useQuery } from "@apollo/react-hooks";
import { UserResponseData, ME_QUERY } from "../../Model/UserInput";
import {useCookies} from 'react-cookie';
import {useUser} from '../../Context/UserContext'
interface MainContainerProps {}

export default function MainContainer({}: MainContainerProps) {
  return (
    <Switch>
      <Route exact path="/login">
        <LoginPage />
      </Route>
      <Route exact path="/register">
        <RegisterPage />
      </Route>
      <Route exact path="/">
        <NavBar/>
        <FrontPage />
      </Route>
      <Route path="/tape">
        <NavBar/>
        <TapePage />
      </Route>
      <Route path="/feed">
        <NavBar/>
        <TapeFeed />
      </Route>
      <Route path="/learn/:tapeId">
        <NavBar/>
        <Learning />
        <Footer />
      </Route>
      <Route path="/profile">
        <NavBar/>
        <ProfilePage />
      </Route>
    </Switch>
  );
}
