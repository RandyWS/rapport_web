import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { _fetchSingleFriend } from "../store";

import { makeStyles } from "@material-ui/core/styles";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@material-ui/core/Grid";
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

const useStyles = makeStyles((theme) => ({
  featCard: {
    maxWidth: "100%",
    border: "none",
    boxShadow: "none",
    alignItems: "center",
    justifyContent: "center",
  },
  featText: {
    fontFamily: "New York Extra Large",
    fontWeight: 800,
  },
  featSubtitle: {
    fontFamily: "SF Mono",
  },
}));

const SingleFriend = (props) => {
  const dispatch = useDispatch();
  const singleFriend = useSelector((state) => state.singleFriend);
  const classes = useStyles();

  useEffect(() => {
    dispatch(_fetchSingleFriend(props.match.params.friendId));
  }, [dispatch]);

  if (!singleFriend.id) {
    return null;
  }

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
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Stack spacing={2} direction="row">
        <Button variant="outlined">Add Convo</Button>
        <Button variant="outlined">Edit</Button>
        <Button variant="outlined">Delete</Button>
      </Stack>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={5} md={4}>
          <Box pt={1}>
            <CardMedia
              square
              component="img"
              sx={{ height: "100%", width: "100%", borderRadius: "10%" }}
              image={singleFriend.imageUrl}
              alt={`${singleFriend.firstName} image`}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={7} md={8}>
          <Box
            m={1}
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 2,
              alignContent: "space-between",
            }}
          >
            <Box pt={1} m={2}>
              <Typography
                gutterBottom
                variant="h3"
                className={classes.featText}
                component="h3"
              >
                {singleFriend.firstName} {singleFriend.lastName}
              </Typography>
              {singleFriend.nickname ? (
                <Typography
                  variant="h5"
                  color="textSecondary"
                  component="p"
                  className={classes.featSubtitle}
                >
                  {singleFriend.nickname}
                </Typography>
              ) : null}
              <Typography
                component="div"
                variant="body1"
                sx={{
                  fontSize: "1.6rem",
                }}
              >
                {singleFriend.description}
              </Typography>
              <Typography
                variant="h6"
                color="textSecondary"
                component="p"
                className={classes.featSubtitle}
                sx={{ fontStyle: "italic" }}
              >
                Rapport Since: {singleFriend.createdAt}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Timeline position="alternate">
        {singleFriend.communications.map((comm) => {
          return (
            <TimelineItem key={comm.id}>
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
    </Box>
  );
};

export default SingleFriend;
