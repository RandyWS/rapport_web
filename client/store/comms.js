import axios from "axios";
const TOKEN = "token";
const token = window.localStorage.getItem(TOKEN);

const SET_COMM = "SET_COMM";
const SET_TIMELINE_COMM = "SET_TIMELINE_COMM";
const SET_SINGLE_FRIEND_COMMS = "SET_SINGLE_FRIEND_COMMS";
const RESET_COMM = "RESET_COMM";
const ADD_COMM = "ADD_COMM";
const EDIT_COMM = "EDIT_COMM";
const DELETE_COMM = "DELETE_COMM";

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

export const setSingleFriendComms = (comms) => {
  return {
    type: SET_SINGLE_FRIEND_COMMS,
    comms,
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

export const editComm = (comm) => {
  return {
    type: EDIT_COMM,
    comm,
  };
};

export const deleteComm = (commId) => {
  return {
    type: DELETE_COMM,
    commId,
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

export const _createComm = (comm) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);

      if (token) {
        const { data } = await axios.post(`/api/comms`, comm, {
          headers: {
            authorization: token,
          },
        });

        if (data.newComm) {
          dispatch(addComm(data.newComm));
        }
      }
    } catch (error) {
      console.log("_Create Comm Error: " + error);
    }
  };
};

export const _editComm = (comm) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);

      if (token) {
        const { data } = await axios.put(`/api/comms/${comm.commId}`, comm, {
          headers: {
            authorization: token,
          },
        });

        if (data.id) {
          dispatch(editComm(data));
        }
      }
    } catch (error) {
      console.log("_Edit Comm Error: " + error);
    }
  };
};

export const _deleteComm = (commId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);

      if (token) {
        const { data } = await axios.delete(`/api/comms/${commId}`, {
          headers: {
            authorization: token,
          },
        });

        if (data) {
          dispatch(deleteComm(commId));
        }
      }
    } catch (error) {
      console.log("_Delete Comm Error: " + error);
    }
  };
};

const initialState = {
  comms: [],
  timelineComms: [],
  singleFriendComms: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_COMM:
      return { ...state, comms: action.comm };
    case SET_SINGLE_FRIEND_COMMS:
      return { ...state, singleFriendComms: action.comms };
    case SET_TIMELINE_COMM:
      return { ...state, timelineComms: action.comm };
    case RESET_COMM:
      return initialState;
    case ADD_COMM:
      let newComms = [action.comm, ...state.singleFriendComms];
      newComms.sort((a, b) => (a.start > b.start ? -1 : 1));
      return { ...state, singleFriendComms: newComms };

    case EDIT_COMM:
      let editedComms = [...state.singleFriendComms];
      editedComms = editedComms.map((comm) => {
        if (comm.id === action.comm.id) {
          return { ...action.comm };
        } else {
          return comm;
        }
      });
      editedComms.sort((a, b) => (a.start > b.start ? -1 : 1));
      return { ...state, singleFriendComms: editedComms };
    case DELETE_COMM:
      let deletedStateCopy = [...state.singleFriendComms];
      if (deletedStateCopy.length) {
        deletedStateCopy = deletedStateCopy.filter(
          (item) => item.id !== action.commId
        );
      }
      return { ...state, singleFriendComms: deletedStateCopy };

    default:
      return state;
  }
};
