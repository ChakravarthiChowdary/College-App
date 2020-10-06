import stateUpdate from "../../utils/stateUpdate";
import {
  SEND_MESSAGE_START,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAIL,
  CLEAR_SEND_ERROR,
} from "../actions/contactActions";

const initialState = {
  loading: false,
  error: null,
  success: false,
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE_START:
      return stateUpdate(state, { loading: true });
    case SEND_MESSAGE_SUCCESS:
      return stateUpdate(state, { loading: false, error: null, success: true });
    case SEND_MESSAGE_FAIL:
      return stateUpdate(state, {
        loading: false,
        error: action.payload,
        success: false,
      });
    case CLEAR_SEND_ERROR:
      return stateUpdate(state, { error: null, success: false });
    default:
      return state;
  }
};

export default contactReducer;
