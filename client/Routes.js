import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import {
  LoggedInRoute,
  AdminRoute,
  GuestRoute,
} from "./components/ProtectedRoutes";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Calendar from "./components/Calendar";
import Landing from "./components/Landing";
import FriendsList from "./components/FriendsList";
import SingleFriend from "./components/SingleFriend";
import AddOrEditFriend from "./components/AddOrEditFriend";
import AddOrEditConvo from "./components/AddOrEditConvo";
import { me } from "./store";

/**
 * COMPONENT
 */
const Routes = () => {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(me());
  }, []);

  if (loggedIn === undefined) {
    return null;
  }

  return (
    <div>
      <Switch>
        <Route exact path="/" component={Landing} />
        <LoggedInRoute
          isLoggedIn={loggedIn}
          exact
          path="/home"
          component={Home}
        />
        <LoggedInRoute
          isLoggedIn={loggedIn}
          exact
          path="/calendar"
          component={Calendar}
        />
        <LoggedInRoute
          isLoggedIn={loggedIn}
          exact
          path="/friends"
          component={FriendsList}
        />
        <LoggedInRoute
          isLoggedIn={loggedIn}
          exact
          path="/friends/add"
          component={AddOrEditFriend}
        />
        <LoggedInRoute
          isLoggedIn={loggedIn}
          exact
          path="/friends/edit/:friendId"
          component={AddOrEditFriend}
        />
        <LoggedInRoute
          isLoggedIn={loggedIn}
          exact
          path="/friends/:friendId"
          component={SingleFriend}
        />
        <LoggedInRoute
          isLoggedIn={loggedIn}
          exact
          path="/conversation/add"
          component={AddOrEditConvo}
        />
        <LoggedInRoute
          isLoggedIn={loggedIn}
          exact
          path="/conversation/edit/:convoId"
          component={AddOrEditConvo}
        />
        <GuestRoute
          isLoggedIn={loggedIn}
          exact
          path="/login"
          component={LogIn}
        />
        <GuestRoute
          isLoggedIn={loggedIn}
          exact
          path="/signup"
          component={SignUp}
        />
        <Route path="*" component={NotFound}></Route>
      </Switch>
    </div>
  );
};

/**
 * CONTAINER
 */

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(Routes);
