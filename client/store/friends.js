import axios from "axios";
import { _createRecurringComm, setSingleFriendComms } from "./index";

const TOKEN = "token";
const SET_FRIENDS = "SET_FRIENDS";
const SET_SINGLE_FRIEND = "SET_SINGLE_FRIEND";
const RESET_SINGLE_FRIEND = "RESET_SINGLE_FRIEND";
const SET_NEW_FRIEND = "SET_NEW_FRIEND";
const DELETE_FRIEND = "DELETE_FRIEND";
const EDIT_FRIEND = "EDIT_FRIEND";

export const setFriends = (friends) => {
  return {
    type: SET_FRIENDS,
    friends,
  };
};

export const setSingleFriend = (singleFriend) => {
  return {
    type: SET_SINGLE_FRIEND,
    singleFriend,
  };
};

export const resetSingleFriend = () => {
  return {
    type: RESET_SINGLE_FRIEND,
    singleFriend: {},
  };
};

export const setNewFriend = (newFriend) => {
  return {
    type: SET_NEW_FRIEND,
    newFriend,
  };
};

export const deleteFriend = (friendId) => {
  return {
    type: DELETE_FRIEND,
    friendId,
  };
};

export const editFriend = (editedFriend) => {
  return {
    type: EDIT_FRIEND,
    editedFriend,
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

export const _fetchSingleFriend = (friendId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);

      if (token) {
        const { data } = await axios.get(`/api/friends/${friendId}`, {
          headers: {
            authorization: token,
          },
        });

        if (data.id) {
          dispatch(setSingleFriend(data));
          dispatch(setSingleFriendComms(data.communications));
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

export const _deleteSingleFriend = (friendId, history) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);

      if (token) {
        const { data } = await axios.delete(`/api/friends/${friendId}`, {
          headers: {
            authorization: token,
          },
        });

        if (data) {
          dispatch(deleteFriend(friendId));
          history.push("/friends");
        }
      }
    } catch (error) {
      console.log("_Delete Friend Error: " + error);
    }
  };
};

export const _editFriend = (friendId, friend) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);

      if (token) {
        const { data } = await axios.put(`/api/friends/${friendId}`, friend, {
          headers: {
            authorization: token,
          },
        });

        if (data.id) {
          dispatch(editFriend(data));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = {
  friends: [],
  singleFriend: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FRIENDS:
      return { ...state, friends: action.friends };
    case SET_NEW_FRIEND:
      let friendCopy = [...state.friends];
      friendCopy.push(action.newFriend);

      return { ...state, friends: friendCopy };
    case SET_SINGLE_FRIEND:
      return { ...state, singleFriend: action.singleFriend };
    case RESET_SINGLE_FRIEND:
      return { singleFriend: action.singleFriend, ...state };
    case DELETE_FRIEND:
      let deletedFriend = [...state.friends];
      deletedFriend = deletedFriend.filter(
        (friend) => friend.id !== action.friendId
      );
      return { ...state, singleFriend: {}, friends: deletedFriend };
    case EDIT_FRIEND:
      let editedFriends = [...state.friends];

      editedFriends = editedFriends.map((friend) => {
        if (friend.id === action.editedFriend.id) {
          return { ...action.editedFriend };
        } else {
          return friend;
        }
      });

      return {
        ...state,
        friends: editedFriends,
        singleFriend: action.editedFriend,
      };
    default:
      return state;
  }
};
