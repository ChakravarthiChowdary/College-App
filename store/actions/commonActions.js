export const GET_APP_DATA_START = "GET_APP_DATA_START";
export const GET_APP_DATA_SUCCESS = "GET_APP_DATA_SUCCESS";
export const GET_APP_DATA_FAIL = "GET_APP_DATA_FAIL";

export const getAppData = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_APP_DATA_START });
      const response = await fetch(
        `https://college-app-991d6.firebaseio.com/appdata.json`
      );
      const privacyandupdate = await response.json();
      dispatch({
        type: GET_APP_DATA_SUCCESS,
        payload: privacyandupdate,
      });
    } catch (error) {
      dispatch({ type: GET_APP_DATA_FAIL, payload: error });
    }
  };
};
