import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { _fetchTimelineComms, _fetchComms, _fetchSingleComm } from "../store";
import CommTimeline from "./CommTimeline";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SingleConvo from "./SingleConvo";

const Home = (props) => {
  const dispatch = useDispatch();
  const { comms } = useSelector((state) => state.comms);
  const [commOpen, setCommOpen] = useState(false);
  const [comm, setComm] = useState({});
  const [tab, setTab] = useState(0);
  const [timeline, setTimeline] = useState([]);
  const [futureComms, setFutureComms] = useState([]);

  useEffect(() => {
    dispatch(_fetchComms());
  }, [dispatch]);

  useEffect(() => {
    let past = [];
    let future = [];
    comms.forEach((comm) => {
      if (comm.type === "future") {
        future.push(comm);
      } else {
        past.unshift(comm);
      }

      setTimeline(past);
      setFutureComms(future);
    });
  }, [comms]);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleCommFormOpen = () => {
    setCommOpen(true);
  };

  const handleCommFormClose = () => {
    setCommOpen(false);
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />

      <SingleConvo
        open={commOpen}
        handleFormClose={handleCommFormClose}
        handleCommFormOpen={handleCommFormOpen}
        comm={comm}
      />

      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs value={tab} onChange={handleTabChange} centered>
          <Tab label="Communications" />
          <Tab label="Scheduled" />
        </Tabs>
      </Box>

      {tab === 0 ? (
        <CommTimeline
          comms={timeline}
          setComm={setComm}
          handleCommFormOpen={handleCommFormOpen}
        />
      ) : (
        <CommTimeline
          comms={futureComms}
          setComm={setComm}
          handleCommFormOpen={handleCommFormOpen}
        />
      )}
    </Box>
  );
};

export default Home;
