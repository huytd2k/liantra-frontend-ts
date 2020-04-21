import React from "react";
import "./user-dash-board.scss";
import { Tabs, Tab } from "react-bootstrap";
import OverviewBoard from "../OverviewBoard";
import HistoryBoard from "../HistoryBoard";
import FavTapeBoard from "../FavTapeBoard";

interface UserDashBoardProps {}

export default function UserDashBoard({}: UserDashBoardProps) {
  return (
    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
      <Tab eventKey="home" title="Overview">
          <OverviewBoard />
      </Tab>
      <Tab eventKey="profile" title="History">
          <HistoryBoard />
      </Tab>
      <Tab eventKey="contact" title="My Tape">
            <FavTapeBoard />
      </Tab>
    </Tabs>
  );
}
