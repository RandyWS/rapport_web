import axios from "axios";
import { setFriends } from "./friends";

const SET_USER = "SET_USER";

export const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

export const _fetchUser = () => {
  return async (dispatch) => {
    try {
      const token = await deviceState.getJWT();

      if (token) {
        const { data } = await axios.get(
          `http://192.168.86.32:8080/api/user/`,
          {
            headers: {
              authorization: token,
            },
          }
        );

        if (data.id) {
          dispatch(setUser(data));
          dispatch(setFriends(data.friends));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export default (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
};
