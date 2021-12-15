import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { _fetchSingleFriend, _fetchRecurring } from "../store";
import AddOrEditConvo from "./AddOrEditConvo";
import AddOrEditFriend from "./AddOrEdit";
import SingleFriendComms from "./SingleFriendComms";
import moment from "moment";

import { makeStyles } from "@material-ui/core/styles";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

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
  const { singleFriend } = useSelector((state) => state.friends);
  const { singleFriendComms, singleFriendRecurring } = useSelector(
    (state) => state.comms
  );
  const classes = useStyles();
  const [commOpen, setCommOpen] = useState(false);
  const [comm, setComm] = useState({});
  const [friendOpen, setFriendOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const [comms, setComms] = useState([]);
  const [futureComms, setFutureComms] = useState([]);

  useEffect(() => {
    dispatch(_fetchSingleFriend(props.match.params.friendId));
    dispatch(_fetchRecurring(props.match.params.friendId));
  }, [dispatch]);

  useEffect(() => {
    let friendComms = [];
    let future = [];
    singleFriendComms.forEach((comm) => {
      if (comm.type === "future") {
        future.unshift(comm);
      } else {
        friendComms.push(comm);
      }

      setComms(friendComms);
      setFutureComms(future);
    });
  }, [singleFriendComms]);

  if (!singleFriend.id) {
    return null;
  }
  console.log("recurring", singleFriendRecurring);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleCommFormOpen = () => {
    setCommOpen(true);
  };

  const handleCommFormClose = () => {
    setCommOpen(false);
  };

  const handleFriendFormOpen = () => {
    setFriendOpen(true);
  };

  const handleFriendFormClose = () => {
    setFriendOpen(false);
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Stack spacing={2} direction="row">
        <Button
          variant="outlined"
          onClick={() => {
            handleCommFormOpen();
          }}
        >
          Add Convo
        </Button>
        <Button variant="outlined" onClick={() => handleFriendFormOpen()}>
          Edit
        </Button>
      </Stack>
      <AddOrEditConvo
        open={commOpen}
        handleFormClose={handleCommFormClose}
        friendId={singleFriend.id}
        comm={comm}
      />

      <AddOrEditFriend
        open={friendOpen}
        handleFormClose={handleFriendFormClose}
        friend={singleFriend}
        history={props.history}
      />

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
                variant="h4"
                className={classes.featText}
                component="h4"
              >
                {singleFriend.firstName} {singleFriend.lastName}
              </Typography>
              {singleFriend.nickname ? (
                <Typography
                  variant="h6"
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
                  fontSize: "1.2rem",
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
                Rapport Since:{" "}
                {moment(singleFriend.createdAt).format("MMMM Do YYYY")}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs value={tab} onChange={handleTabChange} centered>
          <Tab label="Communications" />
          <Tab label="Scheduled" />
        </Tabs>
      </Box>

      {tab === 0 ? (
        <SingleFriendComms
          comms={comms}
          setComm={setComm}
          handleCommFormOpen={handleCommFormOpen}
        />
      ) : (
        <SingleFriendComms
          comms={futureComms}
          setComm={setComm}
          handleCommFormOpen={handleCommFormOpen}
        />
      )}
    </Box>
  );
};

export default SingleFriend;
