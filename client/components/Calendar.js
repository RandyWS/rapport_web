import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddOrEditConvo from "./AddOrEditConvo";
import { _fetchComms, _fetchSingleComm } from "../store";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import { makeStyles } from "@material-ui/core";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundColor: "#edf6f9",
  },
  Media: {
    height: "100%",
    width: "100%",
  },
}));

const Calendar = (props) => {
  const classes = useStyles();
  const [commOpen, setCommOpen] = useState(false);
  const [singleFriendId, setSingleFriendId] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { comms, singleComm } = useSelector((state) => state.comms);

  useEffect(() => {
    dispatch(_fetchComms());
  }, [dispatch]);

  useEffect(() => {
    if (singleComm.id) {
      setCommOpen(true);
    }
  }, [singleComm]);

  const eventClickHandler = (ev) => {
    dispatch(_fetchSingleComm(ev.event.id));
  };

  const handleCommFormClose = () => {
    setCommOpen(false);
  };

  function renderEventContent(eventInfo) {
    return (
      <Grid container alignItems="center">
        <Grid item xs={12} sm={4} md={3}>
          <Box>
            <CardMedia
              square="true"
              component="img"
              sx={{ height: "100%", width: "100%", borderRadius: "10%" }}
              image={eventInfo.event.url}
              alt={`${eventInfo.event.title} image`}
              className={classes.Media}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={7} md={9}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 2,
              alignContent: "space-between",
            }}
          >
            <Box m={1}>
              <Typography noWrap gutterBottom variant="p" component="p">
                {eventInfo.event.title}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    );
  }

  return (
    <Box
      component="main"
      className={classes.background}
      sx={{ flexGrow: 1, p: 3 }}
    >
      <AddOrEditConvo
        open={commOpen}
        handleFormClose={handleCommFormClose}
        friendId={singleComm.friendId}
        comm={singleComm}
      />
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        eventClick={(ev) => {
          ev.jsEvent.preventDefault();
          eventClickHandler(ev);
        }}
        events={comms}
        eventContent={renderEventContent}
      />
    </Box>
  );
};

export default Calendar;
