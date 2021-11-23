import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { _fetchTimelineComms } from "../store";

import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";
import TextsmsIcon from "@mui/icons-material/Textsms";
import CallIcon from "@mui/icons-material/Call";
// in person
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
//future
import UpdateIcon from "@mui/icons-material/Update";
import InstagramIcon from "@mui/icons-material/Instagram";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
//letter
import MarkunreadMailboxIcon from "@mui/icons-material/MarkunreadMailbox";
//other
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const Home = (props) => {
  const dispatch = useDispatch();
  const { timelineComms } = useSelector((state) => state.comms);
  useEffect(() => {
    dispatch(_fetchTimelineComms());
  }, [dispatch]);

  const getIcon = (type) => {
    if (type === "phone-call") {
      return <CallIcon />;
    } else if (type === "text") {
      return <TextsmsIcon />;
    } else if (type === "in-person") {
      return <ConnectWithoutContactIcon />;
    } else if (type === "social-media") {
      return <InstagramIcon />;
    } else if (type === "email") {
      return <AlternateEmailIcon />;
    } else if (type === "letter") {
      return <MarkunreadMailboxIcon />;
    } else if (type === "other") {
      return <MoreHorizIcon />;
    } else if (type === "future") {
      return <UpdateIcon />;
    }
  };

  return (
    <Timeline position="alternate">
      {timelineComms.map((comm, index) => {
        return (
          <TimelineItem key={index}>
            <TimelineOppositeContent
              sx={{ m: "auto 0" }}
              align="right"
              variant="body2"
              color="text.secondary"
            >
              {comm.start}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary">{getIcon(comm.type)}</TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: "12px", px: 2 }}>
              <Typography variant="h6" component="span">
                {comm.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {`${comm.type} with ${comm.friend.firstName} ${comm.friend.lastName}`}
              </Typography>
              <Typography>{comm.content}</Typography>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
};

export default Home;
