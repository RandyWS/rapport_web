import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { _createComm, _editComm, _deleteComm, setFriends } from "../store";

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

const SingleConvo = (props) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("other");
  const [friend, setFriend] = useState("")
  const [error, setError] = useState({
    title: "",
    time: "",
    type: "",
  });
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    if (props.comm.id) {
      setTitle(props.comm.title);
      props.comm.content ? (setContent(props.comm.content)) : (setContent(''))
      setType(props.comm.type);
      setFriend(props.comm.friend.firstName)
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

  return (
    <Dialog open={props.open} onClose={() => props.handleFormClose()}>
      {!deleteOpen ? (
        <>
          <DialogTitle>
            {title} with {friend}
          </DialogTitle>

          <DialogContent>
              {content !== "" ? (<DialogContentText>
              {content} </DialogContentText>) : (
            <DialogContentText> No other details </DialogContentText>)}
          </DialogContent>

          <DialogActions>
            <Button
              onClick={() => {
                props.handleFormClose();
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

export default SingleConvo;