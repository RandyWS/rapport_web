import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { _fetchFriends } from "../store";
import AddOrEditFriend from "./AddOrEdit";
import moment from "moment";

import { makeStyles } from "@material-ui/core/styles";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundColor: "#edf6f9",
  },
  featCard: {
    maxWidth: "100%",
    border: "none",
    boxShadow: "none",
    alignItems: "center",
    backgroundColor: "#edf6f9",
  },
  featText: {
    fontFamily: "New York Extra Large",
    fontWeight: 800,
  },
  featSubtitle: {
    fontFamily: "SF Mono",
  },
}));

const FriendList = (props) => {
  const dispatch = useDispatch();
  const { friends } = useSelector((state) => state.friends);
  const [friendOpen, setFriendOpen] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    dispatch(_fetchFriends());
  }, [dispatch]);

  const clickHandler = (id) => {
    const route = `/friends/${id}`;
    props.history.push(route);
  };

  const handleFriendFormOpen = () => {
    setFriendOpen(true);
  };

  const handleFriendFormClose = () => {
    setFriendOpen(false);
  };

  return (
    <Box
      component="main"
      className={classes.background}
      sx={{ flexGrow: 1, p: 3 }}
    >
      <Toolbar />

      <Stack spacing={2} direction="row">
        <Button
          variant="outlined"
          onClick={() => {
            handleFriendFormOpen();
          }}
        >
          Add Friend
        </Button>
      </Stack>
      <AddOrEditFriend
        open={friendOpen}
        handleFormClose={handleFriendFormClose}
      />

      <Grid container alignItems="center">
        {friends.map((friend) => {
          return (
            <Grid
              container
              alignItems="center"
              onClick={() => clickHandler(friend.id)}
              key={friend.id}
              spacing={1}
            >
              <Grid item xs={12} sm={3} md={2}>
                <Box pt={1}>
                  <CardMedia
                    square="true"
                    component="img"
                    sx={{ height: "100%", width: "100%", borderRadius: "10%" }}
                    image={friend.imageUrl}
                    alt={`${friend.firstName} image`}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={7} md={10}>
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
                      variant="h5"
                      className={classes.featText}
                      component="p"
                    >
                      {friend.firstName} {friend.lastName}
                    </Typography>
                    {friend.nickname ? (
                      <Typography
                        variant="h6"
                        color="textSecondary"
                        component="p"
                        className={classes.featSubtitle}
                        sx={{ fontStyle: "italic" }}
                      >
                        {friend.nickname}
                      </Typography>
                    ) : null}
                    <Typography
                      component="div"
                      variant="body1"
                      sx={{
                        fontSize: "1.2rem",
                      }}
                    >
                      {friend.description}
                    </Typography>
                    <Typography
                      variant="h6"
                      color="textSecondary"
                      component="p"
                      className={classes.featSubtitle}
                      sx={{ fontStyle: "italic" }}
                    >
                      Rapport Since:{" "}
                      {moment(friend.createdAt).format("MMMM Do YYYY")}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default FriendList;
