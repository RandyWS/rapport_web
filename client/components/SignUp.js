import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../store";
import {
  Button,
  Box,
  Toolbar,
  TextField,
  Grid,
  Paper,
  Typography,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  loginForm: {
    justifyContent: "center",
  },
  buttonBlock: {
    width: "100%",
  },
  loginBackground: {
    justifyContent: "center",
    minHeight: "30vh",
    padding: "50px",
  },
  error: {
    color: "red",
  },
}));

const SignUp = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { error } = useSelector((state) => state.auth);
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (error) {
      const dbError = { first: " ", last: " ", email: " ", password: " " };
      setFormError(dbError);
    }
  }, [error]);

  const handleSignUp = () => {
    let currError = { first: "", last: "", email: "", password: "" };

    currError.first = !first.length ? "Please provide your first name." : "";
    currError.last = !last.length ? "Please provide your last name." : "";
    currError.email = !email.length ? "Please input your email." : "";
    currError.password = !password.length ? "Please input your password." : "";
    setFormError(currError);

    if (
      !currError.first.length &&
      !currError.last.length &&
      !currError.email.length &&
      !currError.password.length
    ) {
      dispatch(signup(first, last, email, password));
    }
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <form>
        <Grid container spacing={1} justifyContent="center" direction="row">
          <Grid item>
            <Grid
              container
              direction="column"
              justifyContent="center"
              spacing={2}
              className={classes.loginForm}
            >
              <Paper
                variant="elevation"
                elevation={2}
                className={classes.loginBackground}
              >
                <Grid item>
                  <Grid container direction="column" spacing={1}>
                    {error && error.response && (
                      <div className={classes.error}>{error.response.data}</div>
                    )}
                    <Grid item>
                      <Typography component="h1" variant="h5">
                        Sign Up
                      </Typography>
                    </Grid>

                    <Grid item>
                      <TextField
                        type="text"
                        label="first name"
                        placeholder="first name"
                        variant="outlined"
                        fullWidth
                        value={first}
                        onChange={(ev) => {
                          setFirst(ev.target.value);
                          setFormError({ ...formError, first: "" });
                        }}
                        error={formError.first.length > 0}
                        helperText={
                          formError.first.length ? formError.first : " "
                        }
                        required
                        autoFocus
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        type="text"
                        label="last name"
                        placeholder="last name"
                        variant="outlined"
                        fullWidth
                        value={last}
                        onChange={(ev) => {
                          setLast(ev.target.value);
                          setFormError({ ...formError, last: "" });
                        }}
                        error={formError.last.length > 0}
                        helperText={
                          formError.last.length ? formError.last : " "
                        }
                        required
                        autoFocus
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        type="text"
                        label="email"
                        placeholder="Email"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(ev) => {
                          setEmail(ev.target.value);
                          setFormError({ ...formError, email: "" });
                        }}
                        error={formError.email.length > 0}
                        helperText={
                          formError.email.length ? formError.email : " "
                        }
                        required
                        autoFocus
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        type="password"
                        label="password"
                        placeholder="Password"
                        fullWidth
                        name="password"
                        value={password}
                        onChange={(ev) => {
                          setPassword(ev.target.value);
                          setFormError({ ...formError, password: "" });
                        }}
                        error={formError.password.length > 0}
                        helperText={
                          formError.password.length ? formError.password : " "
                        }
                        variant="outlined"
                        required
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.buttonBlock}
                        onClick={() => {
                          handleSignUp();
                        }}
                      >
                        Sign Up
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
export default SignUp;
