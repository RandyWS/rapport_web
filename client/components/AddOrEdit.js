import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { _createFriend, _editFriend, _deleteSingleFriend } from "../store";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterMoment";
import TimePicker from "@mui/lab/TimePicker";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";

const AddOrEditFriend = (props) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickname, setNickname] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState("weekly");
  const [time, setTime] = useState(new Date());
  const [weekDay, setWeekDay] = useState(0);
  const [error, setError] = useState({
    firstName: "",
    lastName: "",
  });
  const [deleteOpen, setDeleteOpen] = useState(false);

  const frequencyArr = [
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Bi-Weekly", value: "bi-weekly" },
    { label: "Monthly", value: "monthly" },
  ];

  const daysArr = [
    { label: "Monday", value: 1 },
    { label: "Tuesday", value: 2 },
    { label: "Wednesday", value: 3 },
    { label: "Thursday", value: 4 },
    { label: "Friday", value: 5 },
    { label: "Saturday", value: 6 },
    { label: "Sunday", value: 0 },
  ];
  console.log(props);
  useEffect(() => {
    if (props.friend) {
      setFirstName(props.friend.firstName);
      setLastName(props.friend.lastName);
      setNickname(props.friend.nickname || "");
      setImageUrl(props.friend.imageUrl);
      setDescription(props.friend.description || "");
    }
  }, [props.friend]);

  const addOrEdit = () => {
    let currError = { firstName: "", lastName: "" };
    currError.firstName = !firstName.length
      ? "Please provide a first name."
      : "";
    currError.lastName = !lastName.length ? "Please provide a last name." : "";

    setError(currError);
    if (!currError.firstName.length && !currError.lastName.length) {
      if (props.friend) {
        dispatch(
          _editFriend(props.friend.id, {
            nickname,
            firstName,
            lastName,
            description,
          })
        );
      } else {
        dispatch(
          _createFriend(
            {
              nickname,
              firstName,
              lastName,
              description,
            },
            {
              frequency,
              weekDay,
              time,
            }
          )
        );
      }
      props.handleFormClose();
    }
  };

  const deleteFriend = () => {
    dispatch(_deleteSingleFriend(props.friend.id, props.history));
    props.handleFormClose();
    clearForm();
  };

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setNickname("");
    setImageUrl("");
    setDescription("");
  };

  return (
    <Dialog open={props.open} onClose={() => props.handleFormClose()}>
      {!deleteOpen ? (
        <>
          <DialogTitle>
            {props.friend ? "Edit Friend" : "Add Friend"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please provide information about your friend below.
            </DialogContentText>
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                id="outlined-multiline-static"
                label="First"
                required
                value={firstName}
                onChange={(ev) => setFirstName(ev.target.value)}
                error={error.firstName.length > 0}
                helperText={error.firstName.length ? error.firstName : " "}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                id="outlined-multiline-static"
                label="Last"
                required
                value={lastName}
                onChange={(ev) => setLastName(ev.target.value)}
                error={error.lastName.length > 0}
                helperText={error.lastName.length ? error.lastName : " "}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                id="outlined-multiline-static"
                label="Nickname"
                value={nickname}
                onChange={(ev) => setNickname(ev.target.value)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                value={description}
                onChange={(ev) => setDescription(ev.target.value)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                id="outlined-multiline-static"
                label="Image Url"
                value={imageUrl}
                onChange={(ev) => setImageUrl(ev.target.value)}
              />
            </FormControl>

            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                id="outlined-select-weekDay"
                select
                label="Select"
                value={weekDay}
                onChange={(ev) => setWeekDay(ev.target.value)}
                helperText="Please select the day of the week"
              >
                {daysArr.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>

            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                id="outlined-select-frequency"
                select
                label="Select"
                value={frequency}
                onChange={(ev) => setFrequency(ev.target.value)}
                helperText="Please select contact frequency"
              >
                {frequencyArr.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>

            <FormControl fullWidth sx={{ m: 1 }}>
              <LocalizationProvider dateAdapter={DateAdapter}>
                <TimePicker
                  label="Time"
                  value={time}
                  onChange={(ev) => setTime(ev)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
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
              {props.friend ? "Edit" : "Add"}
            </Button>
            {props.friend ? (
              <Button color="warning" onClick={() => setDeleteOpen(true)}>
                Delete
              </Button>
            ) : null}
          </DialogActions>
        </>
      ) : (
        <>
          <DialogTitle>Delete Friend</DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{ textAlign: "center", fontSize: "large", color: "black" }}
            >
              Are you sure you would like to delete this friend? All
              communications associated with this friend will also be deleted.
              This action cannot be undone.
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
            <Button color="warning" onClick={() => deleteFriend()}>
              Delete
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default AddOrEditFriend;
