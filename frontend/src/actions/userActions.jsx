import axios from "axios";
import {
  USER_INPUT_REQUEST,
  USER_INPUT_SUCCESS,
  USER_INPUT_FAIL,
  USER_GET_REQUEST,
  USER_GET_SUCCESS,
  USER_GET_FAIL,
} from "../constant/userConstant";

export const UserInputActions = (formData) => async (dispatch) => {
  try {
  
    dispatch({ type: USER_INPUT_REQUEST });
    const response = await axios.post(`https://j3j3pt.onrender.com/ai`, formData);
 

    if (response.data && response.data.success)
      // console.log(response.data.success)
      return dispatch({
        type: USER_INPUT_SUCCESS,
        payload: response.data.success,
      });
  } catch (err) {
    dispatch({
      type: USER_INPUT_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : "Something went wrong.",
    });
  }
};

export const UserGetActions = () => async (dispatch) => {
  try {
    dispatch({ type: USER_GET_REQUEST });
    const response = await axios.get(`https://j3j3pt.onrender.com/ai`);

    if (response.data && response.data.success)
      return dispatch({
        type: USER_GET_SUCCESS,
        payload: response.data.success,
      });
  } catch (err) {
    return dispatch({
      type: USER_GET_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : "Something went wrong.",
    });
  }
};
