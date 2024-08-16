import axios from "axios";
import { setAuthToken } from "../../Common/functions";
import jwt_decode from "jwt-decode";
import store from "../../store";


import {
  GET_SUCCESS,
  GET_ERRORS,
  SET_CURRENT_USER,
  SET_REDIRECT_TO,
  API_URL,
} from "./types";

// Team leader will enter scores
export const addScores = (scores, history, startStopLoading, clearFields) => (
  dispatch
) => {
  startStopLoading(true);
  axios
    .post(API_URL + "/scores", scores)
    .then((res) => {
      startStopLoading(false);
      if (res.data.success === true) {
        dispatch({
          type: GET_SUCCESS,
          payload: {  message_score: res.data.message },
        });
        clearFields();
        setTimeout(function() {
          history.goBack();
        }, 6000);
      } else {
        alert("Something went wrong");
      }
    })
    .catch((err) => {
      console.log(err);
      startStopLoading(false);
      if (err.response.status === 404) {
        alert("Invalid API URL");
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        });
      }
    });
};


//Login User
export const loginUser = (userData, history, startStopLoading, redirectTo) => (
  dispatch
) => {
  startStopLoading(true);
  axios
    .post(API_URL + "/login", userData)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("usrToken", token);
      // Set token to Auth Header
      setAuthToken(token);
      //Decode token to get user data
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
      startStopLoading(false);
      if (res.data.success === true) {
        console.log(history);
        dispatch({
          type: SET_REDIRECT_TO,
          payload: "",
        });
        history.push(redirectTo);
        // store.dispatch(setCode(""));
      } else {
        history.goBack();
      }
    })
    .catch((err) => {
      // if (err.response.status === 400) {
      //   alert("Invalid Credentials");
      // }
      // else{
      dispatch({
        type: GET_ERRORS,
        payload: err.response ? err.response.data : err.message,
      });
      startStopLoading(false);
    // }
    });
};

//Register User
export const registerUser = (userData, history, startStopLoading) => (
  dispatch
) => {
  startStopLoading(true);
  axios
    .post(API_URL + "/register", userData)
    .then((res) => {
      startStopLoading(false);
      if (res.data.success === true) {
        console.log(res.data);
        // const { token } = res.data;
        // localStorage.setItem("usrToken", token);
        //Set token to Auth Header
        // setAuthToken(token);
        //Decode token to get user data
        // const decoded = jwt_decode(token);
        // dispatch(setCurrentUser(decoded));
        dispatch({
          type: GET_ERRORS,
          payload: { error: { reg_message: res.data.message } },
        });
        history.push("/login");
      } else {
        alert("Something went wrong");
      }
    })
    .catch((err) => {
      console.log(err);
      startStopLoading(false);
      if (err.response.status === 404) {
        alert("Invalid API URL");
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        });
      }
    });
};

//Update User
export const updateUser = (userProfile, startStopLoading) => (dispatch) => {
  startStopLoading(true);
  axios
    .post(API_URL + "/update-profile", userProfile)
    .then((res) => {
      if (res.data.success === true) {
        dispatch({
          type: GET_ERRORS,
          payload: {},
        });
        dispatch({
          type: GET_SUCCESS,
          payload: {
              success_message: res.data.message,
          },
        });
        const { token } = res.data;
        localStorage.setItem("usrToken", token);
        //Set token to Auth Header
        setAuthToken(token);
        //Decode token to get user data
        const decoded = jwt_decode(token);
        // console.log(res.data.message);
        dispatch(setCurrentUser(decoded));
      } else {
        alert("Something went wrong");
      }
      startStopLoading(false);
    })
    .catch((err) => {
      console.log(err)
      if (err.response.status === 404) {
        alert("Invalid API URL");
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: err.response ? err.response.data : err.message,
        });
      }
      startStopLoading(false);
    });
};

export const changePassword = (data, clearFields, startStopLoading) => async (
  dispatch
) => {
  startStopLoading(true);
  axios
    .post(API_URL + "/change-password", data)
    .then((res) => {
      startStopLoading(false);
      dispatch({
        type: GET_ERRORS,
        payload: {},
      });
      // console.log(res.data);
      if (res.data.success === true) {
        clearFields();

        dispatch({
          type: GET_ERRORS,
          payload: {
            error: {
              pass_change: "Password has been changed.",
            },
          },
        });
      }
    })
    .catch((err) => {
      startStopLoading(false);
      if (err.response.status === 404) {
        alert("Invalid API URL");
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data ,
        });
      }
    });
};

export const forgotPassword = (data, startStopLoading) => async (
  dispatch
) => {
  startStopLoading(true);
  axios
    .post(API_URL + "/forget-password", data)
    .then((res) => {
      startStopLoading(false);
      dispatch({
        type: GET_ERRORS,
        payload: {
          error: {
            success_message: "Please check your email to reset your password.",
          },
        },
      });
    })
    .catch((err) => {
      startStopLoading(false);
      if (err.response.status === 404) {
        alert("Invalid API URL");
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        });
      }
    });
};

export const resetPassword = (data, history, startStopLoading, clearFields) => async (
  dispatch
) => {
  startStopLoading(true);
  axios
    .put(`${API_URL}/reset-password-verify/${data.reset_code}`, {
      email: data.email,
      new_password: data.new_password,
      confirm_password: data.confirm_password,
    })
    .then((res) => {
      startStopLoading(false);
      if (res.data.success === true) {
        dispatch({
          type: GET_SUCCESS,
          payload: {
              success_message: "Your password has been reset successfully.",
          },
        });
        
        clearFields();
         setTimeout(function() {
          history.push("/login");
        }, 7000);
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: res.response.data.error,
        });
      }
    })
    .catch((err) => {
      startStopLoading(false);
      if (err.response.status === 404) {
        alert("Invalid API URL");
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        });
      }
    });
};

// Log out user
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("usrToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

// Set user login state
export const setUserState = (user, token) => (dispatch) => {
  //Set token to Auth Header
  setAuthToken(token);
  dispatch(setCurrentUser(user));
};

// Set logged in user
export const setCurrentUser = (userInfo) => {
  return {
    type: SET_CURRENT_USER,
    payload: userInfo,
  };
};

// Set invite code in redux
export const setCode = (userInfo) => {
  return {
    type: SET_REDIRECT_TO,
    payload: userInfo,
  };
};

export const hideErrors = () => (dispatch) => {
  dispatch(clearErrors());
};
export const clearErrors = () => {
  return {
    type: GET_ERRORS,
    payload: { error: {} },
  };
};
