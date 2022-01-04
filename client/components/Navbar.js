import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { logout, me } from "../store";

const useStyles = makeStyles((theme) => ({
  bar: {
    background: "#e07a5f",
  },
  navlinks: {
    marginLeft: theme.spacing(5),
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
    color: "#f4f1de",
  },
  link: {
    textDecoration: "none",
    color: "#f4f1de",
    fontSize: "20px",
    marginLeft: theme.spacing(20),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
}));

function Navbar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(me());
  }, []);

  const handleClick = () => {
    dispatch(logout());
  };

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar className={classes.bar}>
        <Typography variant="h4" className={classes.logo}>
          Rapport
        </Typography>
        {!!auth.id ? (
          <div className={classes.navlinks}>
            <Link to="/home" className={classes.link}>
              Home
            </Link>
            <Link to="/calendar" className={classes.link}>
              Calendar
            </Link>
            <Link to="/friends" className={classes.link}>
              Friends
            </Link>
            <Link to="/" className={classes.link} onClick={handleClick}>
              Logout
            </Link>
          </div>
        ) : (
          <div className={classes.navlinks}>
            <Link to="/login" className={classes.link}>
              Login
            </Link>
            <Link to="/signup" className={classes.link}>
              Sign Up
            </Link>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}

/**
 * CONTAINER
 */

export default Navbar;
