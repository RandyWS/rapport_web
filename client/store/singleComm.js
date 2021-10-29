import axios from 'axios';
import {setSingleFriend} from './singleFriend';
import {addComm} from './comm';
import moment from 'moment';

const SET_SINGLE_COMM = 'SET_SINGLE_COMM';
const RESET_SINGLE_COMM = 'RESET_SINGLE_COMM';

export const setSingleComm = singleComm => {
  return {
    type: SET_SINGLE_COMM,
    singleComm,
  };
};

export const resetSingleComm = () => {
  return {
    type: RESET_SINGLE_COMM,
    singleComm: {},
  };
};

export const _fetchSingleComm = commId => {
  return async dispatch => {
    const token = await deviceState.getJWT();

    try {
      const {data} = await axios.get(
        `http://192.168.86.32:8080/api/communications/${commId}`,
        {
          headers: {
            authorization: token,
          },
        },
      );

      if (data.id) {
        dispatch(setSingleComm(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const _createComm = comm => {
  return async dispatch => {
    try {
      const token = await deviceState.getJWT();

      if (token) {
        const {data} = await axios.post(
          `http://192.168.86.32:8080/api/communications/`,
          comm,
          {
            headers: {
              authorization: token,
            },
          },
        );

        if (data.newCommunication) {
          dispatch(setSingleComm(data.newCommunication));
          dispatch(addComm(data.newCommunication));
        }
      }
    } catch (error) {
      console.log('_Create Communication Error: ' + error);
    }
  };
};

export const _deleteComm = commId => {
  return async dispatch => {
    try {
      const token = await deviceState.getJWT();

      if (token) {
        const {data} = await axios.delete(
          `http://192.168.86.32:8080/api/communications/${commId}`,

          {
            headers: {
              authorization: token,
            },
          },
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export default (state = {}, action) => {
  switch (action.type) {
    case SET_SINGLE_COMM:
      return action.singleComm;
    case RESET_SINGLE_COMM:
      return action.singleComm;
    default:
      return state;
  }
};
