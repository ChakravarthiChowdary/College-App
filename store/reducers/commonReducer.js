import {
  GET_UPDATE_FAIL,
  GET_UPDATE_START,
  GET_UPDATE_SUCCESS,
} from "../actions/commonActions";
import stateUpdate from "../../utils/stateUpdate";

const initialState = {
  loading: false,
  error: null,
  updateText: "",
  version: 1.0,
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_UPDATE_START:
      return stateUpdate(state, { loading: true });
    case GET_UPDATE_SUCCESS:
      return stateUpdate(state, {
        loading: false,
        updateText: action.payload.text,
        version: action.payload.version,
        error: null,
      });
    case GET_UPDATE_FAIL:
      return stateUpdate(state, { loading: false, error: action.payload });
    default:
      return state;
  }
};

export default commonReducer;
