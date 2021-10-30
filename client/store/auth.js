import axios from "axios";
import history from "../history";
const regeneratorRuntime = require("regenerator-runtime");

const TOKEN = "token";

/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH";

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth({ loggedIn: !!res.data.id, ...res.data }));
  } else {
    return dispatch(setAuth({ loggedIn: false }));
  }
};

export const authenticate = (username, password, method) => async (
  dispatch
) => {
  try {
    const res = await axios.post(`/auth/${method}`, { username, password });
    window.localStorage.setItem(TOKEN, res.data.token);
    dispatch(me());
  } catch (authError) {
    return dispatch(setAuth({ error: authError, loggedIn: false }));
  }
};

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem(TOKEN);
    history.push("/login");
    dispatch(setAuth({ loggedIn: false }));
    return {
      type: SET_AUTH,
      auth: {},
    };
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
