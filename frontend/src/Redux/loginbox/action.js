import axios from 'axios';

export const LOGIN_SUCCESS_ACTION = 'LOGIN_SUCCESS_ACTION';
export const LOGIN_FAILURE_ACTION = 'LOGIN_FAILURE_ACTION';

function loginSuccessActionCreator() {
  return {
    type: LOGIN_SUCCESS_ACTION
  }
}

function loginFailureActionCreator(message) {
  return {
    type: LOGIN_FAILURE_ACTION,
    message: message
  }
}

export function loginUserThunk(email, password) {
  return (dispatch) => {
    return axios.post(`http://localhost:8080/api/login`, {
      email: email,
      password: password
    }).then(response => {
      console.log(response);
      if (response.data == null) {
        dispatch(loginFailureActionCreator('Unknown Error'));
      } else if (!response.data.token) {
        // If there was a problem, we want to
        // dispatch the error condition
        dispatch(loginFailureActionCreator(response.data.message || ''));
      } else {
        // If login was successful, set the token in local storage
        localStorage.setItem('token', response.data.token)
        // Dispatch the success action
        dispatch(loginSuccessActionCreator());
        
      }
    }).catch(err => console.log("Error: ", err))
  }
}

export function loginFacebookThunk(accessToken) {
  return (dispatch) => {
    return axios
      .post(
        `${process.env.REACT_APP_API_SERVER}/api/login/facebook`,
        {
          access_token: accessToken
        }
      )
      .then(response => {
        if (response.data == null) {
          dispatch(loginFailureActionCreator('Unknown Error'));
        } else if (!response.data.token) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginFailureActionCreator(response.data.message || ''));
        } else {
          // If login was successful, set the token in local storage
          localStorage.setItem('token', response.data.token);
          // Dispatch the success action
          dispatch(loginSuccessActionCreator());
        }
      })
      .catch (err => console.log('Error: ', err));
  };
}

export const LOGOUT_NOW_ACTION = 'LOGOUT_NOW_ACTION';

export function logoutNowThunk() {
  return (dispatch) => {
    localStorage.clear('token');
    dispatch({ type: LOGOUT_NOW_ACTION });
  }
}