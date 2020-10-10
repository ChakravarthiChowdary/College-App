export const GET_UPDATE_START = "GET_UPDATE_START";
export const GET_UPDATE_SUCCESS = "GET_UPDATE_SUCCESS";
export const GET_UPDATE_FAIL = "GET_UPDATE_FAIL";

export const getUpdateLog = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_UPDATE_START });
      const response = await fetch(
        `https://college-app-991d6.firebaseio.com/updatelog.json`
      );
      const updateRes = await response.json();
      dispatch({ type: GET_UPDATE_SUCCESS, payload: updateRes });
    } catch (error) {
      dispatch({ type: GET_UPDATE_FAIL, payload: error });
    }
  };
};
