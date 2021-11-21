import axios from "axios";
import { _createRecurringComm } from "./index";

const TOKEN = "token";
const SET_FRIENDS = "SET_FRIENDS";
const SET_NEW_FRIEND = "SET_NEW_FRIEND";
const EDIT_FRIEND = "EDIT_FRIEND";
const DELETE_FRIEND = "DELETE_FRIEND";

export const setFriends = (friends) => {
  return {
    type: SET_FRIENDS,
    friends,
  };
};

export const setNewFriend = (newFriend) => {
  return {
    type: SET_NEW_FRIEND,
    newFriend,
  };
};

export const editFriend = (editedFriend) => {
  return {
    type: EDIT_FRIEND,
    editedFriend,
  };
};

export const deleteFriend = (deletedFriend) => {
  return {
    type: DELETE_FRIEND,
    deletedFriend,
  };
};

export const _fetchFriends = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);

      if (token) {
        const { data } = await axios.get(`/api/friends/`, {
          headers: {
            authorization: token,
          },
        });

        if (data.length) {
          dispatch(setFriends(data));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const _createFriend = (newFriend, comm) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);

      if (token) {
        const { data } = await axios.post(`/api/friends/`, newFriend, {
          headers: {
            authorization: token,
          },
        });

        if (data.newFriend) {
          let friendName = "";
          if (newFriend.nickname) {
            friendName = newFriend.nickname;
          } else {
            friendName = newFriend.firstName + " " + newFriend.lastName;
          }
          dispatch(setNewFriend(data.newFriend));
          dispatch(
            _createRecurringComm(
              { friend: friendName, ...comm },
              data.newFriend.id,
              data.newFriend.imageUrl
            )
          );
        }
      }
    } catch (error) {
      console.log("_Create Friend Error: " + error);
    }
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case SET_FRIENDS:
      return action.friends;
    case SET_NEW_FRIEND:
      return [action.newFriend, ...state];
    case EDIT_FRIEND:
      let stateCopy = [...state];
      if (stateCopy.length) {
        stateCopy = stateCopy.map((item) => {
          if (item.id === action.editedFriend.id) {
            item = action.editedFriend;
          }
          return item;
        });
      }
      return stateCopy;
    case DELETE_FRIEND:
      let deletedStateCopy = [...state];
      if (deletedStateCopy.length) {
        deletedStateCopy = deletedStateCopy.filter(
          (item) => item.id !== action.deletedFriend
        );
      }
      return deletedStateCopy;
    default:
      return state;
  }
};
