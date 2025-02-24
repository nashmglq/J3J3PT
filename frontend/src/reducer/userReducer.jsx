import {
  USER_INPUT_REQUEST,
  USER_INPUT_SUCCESS,
  USER_INPUT_FAIL,
  USER_GET_REQUEST,
  USER_GET_SUCCESS,
  USER_GET_FAIL,
} from "../constant/userConstant";
const initialState = {
  loading: false,
  success: false,
  error: false,
  message: "",
};


export const UserInputReducer =  (state = initialState, actions) => {
    switch (actions.type) {
      case USER_INPUT_REQUEST:
        return {loading: true, success: false, error: false};
      case USER_INPUT_SUCCESS:
        return {loading: false, success: true, error: false, message: actions.payload};
      case USER_INPUT_FAIL:
        return {loading: false, success: false, error: true, message: actions.payload};
      default:
        return state;
    }
  };
  


export const UserGetReducer =  (state = initialState, actions) => {
  switch (actions.type) {
    case USER_GET_REQUEST:
      return {loading: true, success: false, error: false};
    case USER_GET_SUCCESS:
      return {loading: false, success: true, error: false, message: actions.payload};
    case USER_GET_FAIL:
      return {loading: false, success: false, error: true, message: actions.payload};
    default:
      return state;
  }
};
