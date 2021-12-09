import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { _fetchFriends } from "../store";

import { makeStyles } from "@material-ui/core/styles";
import Link from "@mui/material/Button";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@mui/material/Typography";

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

const FriendList = (props) => {
  const dispatch = useDispatch();
  const { friends } = useSelector((state) => state.friends);
  const classes = useStyles();

  useEffect(() => {
    dispatch(_fetchFriends());
  }, [dispatch]);

  const clickHandler = (id) => {
    const route = `/friends/${id}`;
    props.history.push(route);
  };

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

      <Link href="/friends/add">Add Friend</Link>

      <Grid container justifyContent="center" alignItems="center">
        {friends.map((friend) => {
          return (
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              onClick={() => clickHandler(friend.id)}
              key={friend.id}
            >
              <Grid item xs={12} sm={5} md={4}>
                <Box pt={1}>
                  <CardMedia
                    square
                    component="img"
                    sx={{ height: "100%", width: "100%", borderRadius: "10%" }}
                    image={friend.imageUrl}
                    alt={`${friend.firstName} image`}
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
                      {friend.firstName} {friend.lastName}
                    </Typography>
                    {friend.nickname ? (
                      <Typography
                        variant="h5"
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
                        fontSize: "1.6rem",
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
                      Rapport Since: {friend.createdAt}
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
