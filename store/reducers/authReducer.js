import AsyncStorage from "@react-native-community/async-storage";

import {
  AUTH_FAIL,
  AUTH_START,
  AUTH_SUCCESS,
  BIOMETRIC_VERIFIED_ERROR,
  LOG_OUT,
  BIOMETRIC_VERIFIED_SUCCESS,
  AUTO_LOGIN_SUCCESS,
} from "../actions/authActions";
import stateUpdate from "../../utils/stateUpdate";

const initialState = {
  loading: false,
  error: null,
  authInfo: null,
  studentInfo: null,
  biometric: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return stateUpdate(state, { loading: true });
    case AUTH_SUCCESS:
      return stateUpdate(state, {
        loading: false,
        authInfo: action.payload.authData,
        studentInfo: action.payload.studentData,
        biometric: true,
        error: null,
      });
    case AUTO_LOGIN_SUCCESS:
      return stateUpdate(state, {
        loading: false,
        authInfo: action.payload.authData,
        studentInfo: action.payload.studentData,
        biometric: false,
        error: null,
      });
    case AUTH_FAIL:
      return stateUpdate(state, { loading: false, error: action.payload });
    case LOG_OUT:
      AsyncStorage.removeItem("auth");
      return initialState;
    case BIOMETRIC_VERIFIED_ERROR:
      return stateUpdate(state, { biometric: false });
    case BIOMETRIC_VERIFIED_SUCCESS:
      return stateUpdate(state, { biometric: true });
    default:
      return state;
  }
};

export default authReducer;
