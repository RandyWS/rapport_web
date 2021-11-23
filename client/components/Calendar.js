import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { _fetchComms } from "../store";
import { Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  Card: {
    margin: "auto",
  },

  Media: {
    height: "100%",
    width: "100%",
  },
}));

const Calendar = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { comms } = useSelector((state) => state.comms);

  useEffect(() => {
    dispatch(_fetchComms());
  }, [dispatch]);

  const eventClickHandler = (ev) => {
    const route = `/friends/${ev.event.id}`;
    props.history.push(route);
  };

  function renderEventContent(eventInfo) {
    return (
      <Paper elevation={1} square className={classes.Card}>
        <p>{eventInfo.event.title}</p>
        <img className={classes.Media} src={eventInfo.event.url} />
      </Paper>
    );
  }

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      eventClick={(ev) => {
        ev.jsEvent.preventDefault();
        console.log(ev.event);
        eventClickHandler(ev);
      }}
      events={comms}
      eventContent={renderEventContent}
    />
  );
};

export default Calendar;
