import AsyncStorage from "@react-native-community/async-storage";

export const AUTH_START = "AUTH_START";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";

export const LOG_OUT = "LOG_OUT";

export const BIOMETRIC_VERIFIED_ERROR = "BIOMETRIC_VERIFIED_ERROR";
export const BIOMETRIC_VERIFIED_SUCCESS = "BIOMETRIC_VERIFIED_SUCCESS";

export const AUTO_LOGIN_SUCCESS = "AUTO_LOGIN_SUCCESS";

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
