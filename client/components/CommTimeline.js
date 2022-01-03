import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
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

const CommTimeline = (props) => {
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
    <Timeline position="right">
      {props.comms.map((comm) => {
        return (
          <TimelineItem
            key={comm.id}
            onClick={() => {
              props.setComm(comm);
              props.handleCommFormOpen();
            }}
          >
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
              {comm.friend ? (
                <Typography variant="body2" color="text.secondary">
                  {`${comm.type} with ${comm.friend.firstName} ${comm.friend.lastName}`}
                </Typography>
              ) : null}
              <Typography>{comm.content}</Typography>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
};

export default CommTimeline;
