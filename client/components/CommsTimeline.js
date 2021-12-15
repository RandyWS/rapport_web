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

const SingleFriendComms = (props) => {
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
              <Typography>{comm.content}</Typography>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
};

export default SingleFriendComms;
