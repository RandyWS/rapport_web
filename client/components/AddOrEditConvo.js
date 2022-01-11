import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { _createComm, _editComm, _deleteComm } from "../store";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterMoment";
import DateTimePicker from "@mui/lab/DateTimePicker";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";

//icons
import TextsmsIcon from "@mui/icons-material/Textsms";
import CallIcon from "@mui/icons-material/Call";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import UpdateIcon from "@mui/icons-material/Update";
import InstagramIcon from "@mui/icons-material/Instagram";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import MarkunreadMailboxIcon from "@mui/icons-material/MarkunreadMailbox";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const AddOrEditConvo = (props) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("other");
  const [start, handleStartChange] = useState(new Date());
  const [end, handleEndChange] = useState(new Date());
  const [error, setError] = useState({
    title: "",
    time: "",
    type: "",
  });
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    if (props.comm.id) {
      setTitle(props.comm.title);
      if (props.comm.content) setContent(props.comm.content);
      setType(props.comm.type);
      handleStartChange(props.comm.start);
      handleEndChange(props.comm.end);
    }
  }, [props.comm]);

  const types = [
    { label: "phone-call", value: "phone-call" },
    { label: "text", value: "text" },
    { label: "in-person", value: "in-person" },
    { label: "social-media", value: "social-media" },
    { label: "email", value: "email" },
    { label: "letter", value: "letter" },
    { label: "other", value: "other" },
    { label: "future", value: "future" },
  ];

  const getIcon = (type) => {
    if (type === "phone-call") {
      return <CallIcon color="primary" />;
    } else if (type === "text") {
      return <TextsmsIcon color="primary" />;
    } else if (type === "in-person") {
      return <ConnectWithoutContactIcon color="primary" />;
    } else if (type === "social-media") {
      return <InstagramIcon color="primary" />;
    } else if (type === "email") {
      return <AlternateEmailIcon color="primary" />;
    } else if (type === "letter") {
      return <MarkunreadMailboxIcon color="primary" />;
    } else if (type === "other") {
      return <MoreHorizIcon color="primary" />;
    } else if (type === "future") {
      return <UpdateIcon color="primary" />;
    }
  };

  const addOrEdit = () => {
    let currError = { title: "", time: "", type: "" };
    currError.title = !title.length
      ? "Please provide a title for this conversation."
      : "";
    currError.time =
      start >= end ? "End of conversation must be after the start time." : "";

    currError.type =
      type === "future" && start <= new Date()
        ? "Future type conversations must occur after the start time."
        : "";

    setError(currError);
    if (
      !currError.time.length &&
      !currError.title.length &&
      !currError.type.length
    ) {
      if (props.comm.id) {
        dispatch(
          _editComm({
            friendId: props.friendId,
            commId: props.comm.id,
            title,
            content,
            type,
            start,
            end,
          })
        );
      } else {
        dispatch(
          _createComm({
            friendId: props.friendId,
            title,
            content,
            type,
            start,
            end,
          })
        );
      }
      props.handleEditClose()
      clearForm();
    }
  };

  const deleteComm = () => {
    dispatch(_deleteComm(props.comm.id));
    props.handleFormClose();
    clearForm();
  };

  const clearForm = () => {
    setTitle("");
    setContent("");
    setType("other");
    handleStartChange(new Date());
    handleEndChange(new Date());
  };

  return (
    <Dialog open={props.open} onClose={() => props.handleEditClose()}>
      {!deleteOpen ? (
        <>
          <DialogTitle>
            {props.comm.id ? "Edit Conversation" : "Add Conversation"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please add the content and date of your conversation with this
              friend.
            </DialogContentText>
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                id="outlined-multiline-static"
                label="Title"
                required
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
                error={error.title.length > 0}
                helperText={error.title.length ? error.title : " "}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                id="outlined-multiline-static"
                label="Content"
                multiline
                rows={4}
                value={content}
                onChange={(ev) => setContent(ev.target.value)}
              />
            </FormControl>

            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                id="outlined-select-weekDay"
                select
                label="Type of Communication"
                value={type}
                onChange={(ev) => setType(ev.target.value)}
                error={error.type.length > 0}
                helperText={error.type.length ? error.type : " "}
              >
                {types.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {getIcon(option.value)}: {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>

            <LocalizationProvider dateAdapter={DateAdapter}>
              <FormControl fullWidth sx={{ m: 1 }}>
                <DateTimePicker
                  label="Start Date/Time of Communication"
                  value={start}
                  onChange={(ev) => handleStartChange(ev)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </FormControl>
              <FormControl fullWidth sx={{ m: 1 }}>
                <DateTimePicker
                  label="End Date/Time of Communication"
                  value={end}
                  onChange={(ev) => handleEndChange(ev)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={error.time.length > 0}
                      helperText={error.time.length ? error.time : " "}
                    />
                  )}
                />
              </FormControl>
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                props.handleEditClose();
                clearForm();
              }}
            >
              Cancel
            </Button>
            <Button onClick={() => addOrEdit()}>
              {props.comm.id ? "Edit" : "Add"}
            </Button>
            {props.comm.id ? (
              <Button color="warning" onClick={() => setDeleteOpen(true)}>
                Delete
              </Button>
            ) : null}
          </DialogActions>
        </>
      ) : (
        <>
          <DialogTitle>Delete Conversation</DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{ textAlign: "center", fontSize: "large", color: "black" }}
            >
              Are you sure you would like to delete this communication?
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center", color: "warning" }}>
            <Button
              onClick={() => {
                setDeleteOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button color="warning" onClick={() => deleteComm()}>
              Delete
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default AddOrEditConvo;
