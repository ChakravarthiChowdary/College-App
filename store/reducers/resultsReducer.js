import {
  CLEAR_RESULT_STATE,
  GET_ALL_RESULTS_START,
  GET_AVAILABLE_RESULTS_FAIL,
  GET_AVAILABLE_RESULTS_START,
  GET_AVAILABLE_RESULTS_SUCCESS,
  GET_RESULT_FAIL,
  GET_RESULT_START,
  GET_RESULT_SUCCESS,
  GET_SUBJECTS_FOR_DEPT_FAIL,
  GET_SUBJECTS_FOR_DEPT_START,
  GET_SUBJECTS_FOR_DEPT_SUCCESS,
  GET_ALL_RESULTS_SUCCESS,
  GET_ALL_RESULTS_FAIL,
  CLEAR_SUBJECT_ANALYSIS_ERROR_STATE,
  GET_COLLEGE_TOPPERS_START,
  GET_COLLEGE_TOPPERS_SUCCESS,
  GET_COLLEGE_TOPPERS_FAIL,
  CLEAR_TOPPERS,
} from "../actions/resultsActions";
import stateUpdate from "../../utils/stateUpdate";

const initialState = {
  availableResultsLoading: false,
  availableResultsError: null,
  availableResults: [],
  subjects: [],
  subjectsLoading: false,
  subjectsError: null,
  result: null,
  resultLoading: false,
  resultError: null,
  resultOfStudent: null,
  studentData: null,
  analysisLoading: false,
  analysisError: null,
  analysis: null,
  analysisSubject: null,
  toppersLoading: false,
  toppers: null,
  toppersError: null,
};

const resultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AVAILABLE_RESULTS_START:
      return stateUpdate(state, { availableResultsLoading: true });
    case GET_AVAILABLE_RESULTS_SUCCESS:
      return stateUpdate(state, {
        availableResultsLoading: false,
        availableResultsError: null,
        availableResults: action.payload,
      });
    case GET_AVAILABLE_RESULTS_FAIL:
      return stateUpdate(state, {
        availableResultsLoading: false,
        availableResultsError: action.payload,
      });
    case GET_SUBJECTS_FOR_DEPT_START:
      return stateUpdate(state, { subjectsLoading: true });
    case GET_SUBJECTS_FOR_DEPT_SUCCESS:
      return stateUpdate(state, {
        subjectsLoading: false,
        subjectsError: null,
        subjects: action.payload,
      });
    case GET_SUBJECTS_FOR_DEPT_FAIL:
      return stateUpdate(state, {
        subjectsLoading: false,
        subjectsError: action.payload,
      });
    case GET_RESULT_START:
      return stateUpdate(state, { resultLoading: true });
    case GET_RESULT_SUCCESS:
      return stateUpdate(state, {
        resultLoading: false,
        resultError: null,
        result: action.payload.result,
        resultOfStudent: action.payload.result,
        studentData: action.payload.studentData,
      });
    case GET_RESULT_FAIL:
      return stateUpdate(state, {
        resultLoading: false,
        resultError: action.payload,
      });
    case CLEAR_RESULT_STATE:
      return stateUpdate(state, {
        resultError: null,
        resultLoading: false,
        result: null,
      });
    case GET_ALL_RESULTS_START:
      return stateUpdate(state, { analysisLoading: true });
    case GET_ALL_RESULTS_SUCCESS:
      return stateUpdate(state, {
        analysisLoading: false,
        analysisError: null,
        analysis: action.payload,
        analysisSubject: action.payload,
      });
    case GET_ALL_RESULTS_FAIL:
      return stateUpdate(state, {
        analysisLoading: false,
        analysisError: action.payload,
      });
    case CLEAR_SUBJECT_ANALYSIS_ERROR_STATE:
      return stateUpdate(state, {
        analysisLoading: false,
        analysisError: null,
        analysis: null,
      });
    case GET_COLLEGE_TOPPERS_START:
      return stateUpdate(state, { toppersLoading: true });
    case GET_COLLEGE_TOPPERS_SUCCESS:
      return stateUpdate(state, {
        toppersLoading: false,
        toppersError: null,
        toppers: action.payload,
      });
    case GET_COLLEGE_TOPPERS_FAIL:
      return stateUpdate(state, {
        toppersLoading: false,
        toppersError: action.payload,
      });
    case CLEAR_TOPPERS:
      return stateUpdate(state, {
        toppersLoading: false,
        toppersError: null,
        toppers: null,
      });
    default:
      return state;
  }
};

export default resultsReducer;
