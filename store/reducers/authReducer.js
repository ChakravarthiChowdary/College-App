import AsyncStorage from "@react-native-community/async-storage";

import {
  AUTH_FAIL,
  AUTH_START,
  AUTH_SUCCESS,
  BIOMETRIC_VERIFIED_ERROR,
  LOG_OUT,
  BIOMETRIC_VERIFIED_SUCCESS,
  AUTO_LOGIN_SUCCESS,
  FORGOT_PASSWORD_START,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  CLEAR_ERROR_STATE,
  CHANGE_PROFILE_START,
  CHANGE_PROFILE_SUCCESS,
  CHANGE_PROFILE_FAIL,
} from "../actions/authActions";
import stateUpdate from "../../utils/stateUpdate";

const initialState = {
  loading: false,
  error: null,
  authInfo: null,
  studentInfo: null,
  biometric: false,
  forgotError: null,
  forgotSuccess: null,
  updateProfileSuccess: null,
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
    case FORGOT_PASSWORD_START:
      return stateUpdate(state, { loading: true });
    case FORGOT_PASSWORD_SUCCESS:
      return stateUpdate(state, {
        loading: false,
        forgotSuccess: action.payload,
        forgotError: null,
      });
    case FORGOT_PASSWORD_FAIL:
      return stateUpdate(state, {
        loading: false,
        forgotError: action.payload,
        forgotSuccess: null,
      });
    case CHANGE_PROFILE_START:
      return stateUpdate(state, { loading: true });
    case CHANGE_PROFILE_SUCCESS:
      return stateUpdate(state, {
        loading: false,
        studentInfo: action.payload,
        error: null,
        updateProfileSuccess: true,
      });
    case CHANGE_PROFILE_FAIL:
      return stateUpdate(state, {
        loading: false,
        error: action.payload,
        updateProfileSuccess: null,
      });
    case CLEAR_ERROR_STATE:
      return stateUpdate(state, { error: null });
    default:
      return state;
  }
};

export default authReducer;
