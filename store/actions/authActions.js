import AsyncStorage from "@react-native-community/async-storage";

export const AUTH_START = "AUTH_START";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";

export const LOG_OUT = "LOG_OUT";

export const BIOMETRIC_VERIFIED_ERROR = "BIOMETRIC_VERIFIED_ERROR";
export const BIOMETRIC_VERIFIED_SUCCESS = "BIOMETRIC_VERIFIED_SUCCESS";

export const AUTO_LOGIN_SUCCESS = "AUTO_LOGIN_SUCCESS";

export const FORGOT_PASSWORD_START = "FORGOT_PASSWORD_START";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAIL = "FORGOT_PASSWORD_FAIL";

export const CHANGE_PROFILE_START = "CHANGE_PROFILE_START";
export const CHANGE_PROFILE_SUCCESS = "CHANGE_PROFILE_SUCCESS";
export const CHANGE_PROFILE_FAIL = "CHANGE_PROFILE_FAIL";

export const CLEAR_ERROR_STATE = "CLEAR_ERROR_STATE";

export const loginUser = (authInfo) => {
  return async (dispatch) => {
    try {
      dispatch({ type: AUTH_START });
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB9H0Zk7rO5HNTlPiG90cTnA1l47h5nH28`,
        {
          method: "POST",
          body: JSON.stringify(authInfo),
        }
      );
      const studentRes = await fetch(
        `https://college-app-991d6.firebaseio.com/studentinfo/${
          authInfo.email.split("@")[0]
        }.json`
      );
      const studentResponse = await studentRes.json();
      const authRes = await response.json();

      if (!authRes.error) {
        AsyncStorage.setItem("auth", JSON.stringify(authRes));
        dispatch({
          type: AUTH_SUCCESS,
          payload: { authData: authRes, studentData: studentResponse },
        });
      } else {
        dispatch({ type: AUTH_FAIL, payload: authRes.error });
      }
    } catch (error) {
      dispatch({ type: AUTH_FAIL, payload: error });
    }
  };
};

export const autoLogin = () => {
  return async (dispatch) => {
    try {
      const authInfo = JSON.parse(await AsyncStorage.getItem("auth"));
      const studentRes = await fetch(
        `https://college-app-991d6.firebaseio.com/studentinfo/${
          authInfo.email.split("@")[0]
        }.json`
      );
      const studentResponse = await studentRes.json();
      dispatch({
        type: AUTO_LOGIN_SUCCESS,
        payload: { authData: authInfo, studentData: studentResponse },
      });
    } catch (error) {
      dispatch({ type: AUTH_FAIL, payload: error });
    }
  };
};

export const forgotPassword = (studentInfo) => {
  return async (dispatch) => {
    try {
      dispatch({ type: FORGOT_PASSWORD_START });
      const response = await fetch(
        `https://college-app-991d6.firebaseio.com/studentinfo/${studentInfo.id}.json`
      );
      const studentRes = await response.json();
      if (!studentRes.error) {
        if (
          studentInfo.dob.toString().slice(0, 15) !==
          studentRes.dob.toString().slice(0, 15)
        ) {
          dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: { message: "DOB is incorrect !" },
          });
        } else if (studentInfo.phone !== studentRes.phone.toString()) {
          dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: { message: "Phone number is incorrect !" },
          });
        } else {
          dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: "Password Sent to your mobile !",
          });
        }
      } else {
        dispatch({ type: FORGOT_PASSWORD_FAIL, payload: studentRes.error });
      }
    } catch (error) {
      dispatch({ type: FORGOT_PASSWORD_FAIL, payload: error });
    }
  };
};

export const changeProfile = (studentInfo) => {
  return async (dispatch) => {
    try {
      dispatch({ type: CHANGE_PROFILE_START });
      await fetch(
        `https://college-app-991d6.firebaseio.com/studentinfo/${studentInfo.id}.json`,
        { method: "PATCH", body: JSON.stringify(studentInfo) }
      );
      dispatch({ type: CHANGE_PROFILE_SUCCESS, payload: studentInfo });
    } catch (error) {
      dispatch({ type: CHANGE_PROFILE_FAIL, payload: error });
    }
  };
};
