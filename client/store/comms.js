import axios from "axios";
const TOKEN = "token";
const token = window.localStorage.getItem(TOKEN);

const SET_COMM = "SET_COMM";
const RESET_COMM = "RESET_COMM";
const ADD_COMM = "ADD_COMM";
const DELETE_FRIEND_COMM = "DELETE_FRIEND_COMM";

export const setComm = (comm) => {
  return {
    type: SET_COMM,
    comm,
  };
};

export const resetComm = () => {
  return {
    type: SET_COMM,
    comm: [],
  };
};

export const addComm = (comm) => {
  return {
    type: ADD_COMM,
    comm,
  };
};

export const deleteFriendComm = (friendId) => {
  return {
    type: DELETE_FRIEND_COMM,
    friendId,
  };
};

export const _fetchComms = () => {
  return async (dispatch) => {
    try {
      if (token) {
        const { data } = await axios.get(`/api/comms`, {
          headers: {
            authorization: token,
          },
        });

        if (data.length) {
          const communications = data.map((comm) => {
            comm.url = comm.friend.imageUrl;
            comm.id = comm.friendId;
            return comm;
          });
          dispatch(setComm(communications));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const _createRecurringComm = (comm, friendId, imageUrl) => {
  return async (dispatch) => {
    try {
      console.log(imageUrl);
      const token = await deviceState.getJWT();

      if (token) {
        const { data } = await axios.post(
          `http://192.168.86.32:8080/api/communications/recurring/${friendId}`,
          comm,
          {
            headers: {
              authorization: token,
            },
          }
        );

        if (data.newComm.length) {
          const recurringComm = data.newComm.map((comm) => {
            let start = new Date(comm.start);
            let end = new Date(comm.end);
            comm.start = start;
            comm.end = end;
            comm.imageUrl = imageUrl;
            return comm;
          });
          dispatch(addComm(recurringComm));
        }
      }
    } catch (error) {
      console.log("_Create Communication Error: " + error);
    }
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case SET_COMM:
      return action.comm;
    case RESET_COMM:
      return action.comm;
    case ADD_COMM:
      return [...action.comm, ...state];
    case DELETE_FRIEND_COMM:
      let deletedStateCopy = [...state];
      if (deletedStateCopy.length) {
        deletedStateCopy = deletedStateCopy.filter(
          (item) => item.friendId !== action.friendId
        );
      }
      return deletedStateCopy;

    default:
      return state;
  }
};
