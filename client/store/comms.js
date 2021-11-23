import axios from "axios";
const TOKEN = "token";
const token = window.localStorage.getItem(TOKEN);

const SET_COMM = "SET_COMM";
const SET_TIMELINE_COMM = "SET_TIMELINE_COMM";
const RESET_COMM = "RESET_COMM";
const ADD_COMM = "ADD_COMM";
const DELETE_FRIEND_COMM = "DELETE_FRIEND_COMM";

export const setComm = (comm) => {
  return {
    type: SET_COMM,
    comm,
  };
};
export const setTimelineComm = (comm) => {
  return {
    type: SET_TIMELINE_COMM,
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

export const _fetchTimelineComms = () => {
  return async (dispatch) => {
    try {
      if (token) {
        const { data } = await axios.get(`/api/comms/timeline`, {
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
          dispatch(setTimelineComm(communications));
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
      if (token) {
        const { data } = await axios.post(
          `/api/comms/recurring/${friendId}`,
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

const initialState = {
  comms: [],
  timelineComms: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_COMM:
      return { ...state, comms: action.comm };
    case SET_TIMELINE_COMM:
      return { ...state, timelineComms: action.comm };

    case RESET_COMM:
      return initialState;
    case ADD_COMM:
      let newComms = [...action.comm, ...state.comms];
      return { ...state, comms: newComms };
    case DELETE_FRIEND_COMM:
      let deletedStateCopy = [...state.comms];
      if (deletedStateCopy.length) {
        deletedStateCopy = deletedStateCopy.filter(
          (item) => item.friendId !== action.friendId
        );
      }
      return { ...state, comms: deletedStateCopy };

    default:
      return state;
  }
};
