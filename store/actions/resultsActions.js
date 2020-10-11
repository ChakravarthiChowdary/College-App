export const GET_AVAILABLE_RESULTS_START = "GET_AVAILABLE_RESULTS_START";
export const GET_AVAILABLE_RESULTS_SUCCESS = "GET_AVAILABLE_RESULTS_SUCCESS";
export const GET_AVAILABLE_RESULTS_FAIL = "GET_AVAILABLE_RESULTS_FAIL";

export const GET_SUBJECTS_FOR_DEPT_START = "GET_SUBJECTS_FOR_DEPT_START";
export const GET_SUBJECTS_FOR_DEPT_SUCCESS = "GET_SUBJECTS_FOR_DEPT_SUCCESS";
export const GET_SUBJECTS_FOR_DEPT_FAIL = "GET_SUBJECTS_FOR_DEPT_FAIL";

export const GET_RESULT_START = "GET_RESULT_START";
export const GET_RESULT_SUCCESS = "GET_RESULT_SUCCESS";
export const GET_RESULT_FAIL = "GET_RESULT_FAIL";

export const GET_ALL_RESULTS_START = "GET_ALL_RESULTS_START";
export const GET_ALL_RESULTS_SUCCESS = "GET_ALL_RESULTS_SUCCESS";
export const GET_ALL_RESULTS_FAIL = "GET_ALL_RESULTS_FAIL";

export const GET_COLLEGE_TOPPERS_START = "GET_COLLEGE_TOPPERS_START";
export const GET_COLLEGE_TOPPERS_SUCCESS = "GET_COLLEGE_TOPPERS_SUCCESS";
export const GET_COLLEGE_TOPPERS_FAIL = "GET_COLLEGE_TOPPERS_FAIL";

export const CLEAR_RESULT_STATE = "CLEAR_RESULT_STATE";
export const CLEAR_SUBJECT_ANALYSIS_ERROR_STATE =
  "CLEAR_SUBJECT_ANALYSIS_ERROR_STATE";
export const CLEAR_TOPPERS = "CLEAR_TOPPERS";

export const getAvailableResults = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_AVAILABLE_RESULTS_START });
      const response = await fetch(
        "https://college-app-991d6.firebaseio.com/results/availableresults.json"
      );
      const availableresults = await response.json();
      const availableresultsArray = [];
      for (let key in availableresults) {
        availableresultsArray.push(availableresults[key]);
      }
      dispatch({
        type: GET_AVAILABLE_RESULTS_SUCCESS,
        payload: availableresultsArray,
      });
    } catch (error) {
      dispatch({ type: GET_AVAILABLE_RESULTS_FAIL, payload: error });
    }
  };
};

export const getDepartmentSubject = (result) => {
  const { batch, semester } = result;
  return async (dispatch) => {
    try {
      dispatch({ type: GET_SUBJECTS_FOR_DEPT_START });
      const response = await fetch(
        `https://college-app-991d6.firebaseio.com/results/${batch}/results/${semester}/subjects.json`
      );
      const subjects = await response.json();
      let subjectsArray = [];
      for (let key in subjects) {
        subjectsArray.push({ subject: key, branch: subjects[key] });
      }
      dispatch({ type: GET_SUBJECTS_FOR_DEPT_SUCCESS, payload: subjectsArray });
    } catch (error) {
      dispatch({ type: GET_SUBJECTS_FOR_DEPT_FAIL, payload: error });
    }
  };
};

export const getResult = (result, hallTicketNo) => {
  return async (dispatch) => {
    const { batch, semester } = result;

    try {
      dispatch({ type: GET_RESULT_START });
      const response = await fetch(
        `https://college-app-991d6.firebaseio.com/results/${batch}/results/${semester}/studentsresults/${hallTicketNo}.json`
      );
      const result = await response.json();
      if (!result) {
        dispatch({
          type: GET_RESULT_FAIL,
          payload: {
            message:
              "Not a valid hall ticket number.\nTry entering all lower case characters.",
          },
        });
      } else {
        const studentRes = await fetch(
          `https://college-app-991d6.firebaseio.com/studentinfo/${result.id}.json`
        );
        const studentData = await studentRes.json();

        dispatch({
          type: GET_RESULT_SUCCESS,
          payload: { result: result, studentData: studentData },
        });
      }
    } catch (error) {
      dispatch({ type: GET_RESULT_FAIL, payload: error });
    }
  };
};

export const getSubjectAnalysis = (result, subject) => {
  return async (dispatch) => {
    try {
      const { semester, batch } = result;
      dispatch({ type: GET_ALL_RESULTS_START });
      const resultResponse = await fetch(
        `https://college-app-991d6.firebaseio.com/results/${batch}/results/${semester}/studentsresults.json`
      );

      const allresults = await resultResponse.json();

      const score = [];

      for (let key in allresults) {
        if (allresults[key][subject])
          score.push({
            score: allresults[key][subject],
            id: key,
            subject: subject,
          });
      }
      dispatch({
        type: GET_ALL_RESULTS_SUCCESS,
        payload: score,
      });
    } catch (error) {
      dispatch({ type: GET_ALL_RESULTS_FAIL, payload: error });
    }
  };
};

export const getCollegeToppers = (result) => {
  return async (dispatch) => {
    try {
      const { batch, semester } = result;
      dispatch({ type: GET_COLLEGE_TOPPERS_START });
      const response = await fetch(
        `https://college-app-991d6.firebaseio.com/results/${batch}/results/${semester}/studentsresults.json`
      );
      const toppersRes = await response.json();
      let resultsArray = [];
      for (let key in toppersRes) {
        resultsArray.push({
          id: toppersRes[key].id,
          CGPA: toppersRes[key].CGPA,
          SGPA: toppersRes[key].SGPA,
          department: toppersRes[key].department,
        });
      }

      resultsArray.sort((a, b) => {
        return a.SGPA > b.SGPA ? -1 : 1;
      });

      const toppersArray = resultsArray.slice(0, 5);
      const newToppersArray = [];

      const studentResponce = await fetch(
        `https://college-app-991d6.firebaseio.com/studentinfo.json`
      );
      const studentRes = await studentResponce.json();
      for (let key in toppersArray) {
        newToppersArray.push({
          ...toppersArray[key],
          firstname: studentRes[toppersArray[key].id].firstname,
          lastname: studentRes[toppersArray[key].id].lastname,
        });
      }

      dispatch({ type: GET_COLLEGE_TOPPERS_SUCCESS, payload: newToppersArray });
    } catch (error) {
      dispatch({ type: GET_COLLEGE_TOPPERS_FAIL, payload: error });
    }
  };
};
