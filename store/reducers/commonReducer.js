import {
  GET_APP_DATA_SUCCESS,
  GET_APP_DATA_START,
  GET_APP_DATA_FAIL,
} from "../actions/commonActions";
import stateUpdate from "../../utils/stateUpdate";

const initialState = {
  loading: false,
  error: null,
  updateText: "",
  version: 1.0,
  privacyText: "",
  principalMessage: "",
  objective: "",
  honestMessage: "",
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_APP_DATA_START:
      return stateUpdate(state, { loading: true });
    case GET_APP_DATA_SUCCESS:
      return stateUpdate(state, {
        loading: false,
        updateText: action.payload.updatelog.text,
        version: action.payload.updatelog.version,
        privacyText: action.payload.privacypolicy.text,
        principalMessage: action.payload.principalMessage.text,
        objective: action.payload.placements.objective,
        honestMessage: action.payload.placements.honestmessage,
        error: null,
      });
    case GET_APP_DATA_FAIL:
      return stateUpdate(state, { loading: false, error: action.payload });
    default:
      return state;
  }
};

export default commonReducer;
