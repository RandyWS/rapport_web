import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  Link,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  loginForm: {
    justifContent: "center",
    minHeight: "90vh",
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

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const classes = useStyles();
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div>
      <Grid container spacing={0} justifyContent="center" direction="row">
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
              {error && error.response && (
                <Grid item>
                  <Typography
                    component="h5"
                    variant="h6"
                    className={classes.error}
                  >
                    <div> {error.response.data} </div>
                  </Typography>
                </Grid>
              )}
              <Grid item>
                <Typography component="h1" variant="h5">
                  {displayName}
                </Typography>
              </Grid>
              <form onSubmit={handleSubmit} name={name}>
                <Grid item>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <TextField
                        type="text"
                        placeholder="Username"
                        fullWidth
                        name="username"
                        variant="outlined"
                        required
                        autoFocus
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        type="password"
                        placeholder="Password"
                        fullWidth
                        name="password"
                        variant="outlined"
                        required
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.buttonBlock}
                      >
                        {displayName}
                      </Button>
                    </Grid>
                  </Grid>
                  {error && error.response && (
                    <div> {error.response.data} </div>
                  )}
                </Grid>
              </form>
              <Grid item>
                <Link href="#" variant="body2">
                  Forgot Password?
                </Link>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      dispatch(authenticate(username, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
