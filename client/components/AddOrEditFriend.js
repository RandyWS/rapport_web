import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterMoment";
import TimePicker from "@mui/lab/TimePicker";
import Typography from "@mui/material/Typography";

import { useDispatch, useSelector } from "react-redux";
import { _fetchSingleFriend, _createFriend, _editFriend } from "../store";

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
    nickname: "",
  });

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

  const { singleFriend } = useSelector((state) => state.friends);

  useEffect(() => {
    if (props.match.params.friendId) {
      dispatch(_fetchSingleFriend(props.match.params.friendId));
    }
  }, []);

  useEffect(() => {
    if (singleFriend.id) {
      setFirstName(singleFriend.firstName);
      setLastName(singleFriend.lastName);
      setNickname(singleFriend.nickname);
      setImageUrl(singleFriend.imageUrl);
      setDescription(singleFriend.description);
    }
  }, [singleFriend.id]);

  const addFriend = () => {
    let currError = { firstName: "", lastName: "" };
    currError.firstName = !firstName.length
      ? "Please provide a first name."
      : "";
    currError.lastName = !lastName.length ? "Please provide a last name." : "";
    setError(error);
    if (!currError.firstName.length && !currError.lastName.length) {
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
          },
          props.history
        )
      );
    }
  };

  const editFriend = () => {
    let error = { firstName: "", lastName: "" };
    error.firstName = !firstName.length ? "Please provide a first name." : "";
    error.lastName = !lastName.length ? "Please provide a last name." : "";
    setError(error);
    dispatch(
      _editFriend(
        singleFriend.id,
        {
          nickname,
          firstName,
          lastName,
          description,
        },
        props.history
      )
    );
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      {props.match.params.friendId ? (
        <Button
          onClick={() => {
            editFriend();
          }}
          variant="contained"
        >
          Edit Friend
        </Button>
      ) : (
        <Button
          onClick={() => {
            addFriend();
          }}
          variant="contained"
        >
          Add Friend
        </Button>
      )}

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl sx={{ m: 1 }}>
          <TextField
            required
            id="outlined-error-helper-text"
            value={firstName}
            onChange={(ev) => setFirstName(ev.target.value)}
            label="First Name"
            error={error.firstName.length > 0}
            helperText={error.firstName.length ? error.firstName : " "}
          />
        </FormControl>
        <FormControl sx={{ m: 1 }}>
          <TextField
            required
            id="outlined-error-helper-text"
            value={lastName}
            onChange={(ev) => setLastName(ev.target.value)}
            label="Last Name"
            error={error.lastName.length > 0}
            helperText={error.lastName.length ? error.lastName : " "}
          />
        </FormControl>
        <FormControl sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Nickname</InputLabel>
          <OutlinedInput
            required
            id="outlined-adornment-amount"
            value={nickname}
            onChange={(ev) => setNickname(ev.target.value)}
            label="nickname"
          />
        </FormControl>
      </Box>

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
        <InputLabel htmlFor="outlined-adornment-amount">ImageUrl</InputLabel>
        <OutlinedInput
          required
          id="outlined-adornment-amount"
          label="ImageUrl"
          value={imageUrl}
          onChange={(ev) => setImageUrl(ev.target.value)}
        />
      </FormControl>

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

      <LocalizationProvider dateAdapter={DateAdapter}>
        <TimePicker
          label="Time"
          value={time}
          onChange={(ev) => setTime(ev)}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default AddOrEditFriend;
