export const SEND_MESSAGE_START = "SEND_MESSAGE_START";
export const SEND_MESSAGE_SUCCESS = "SEND_MESSAGE_SUCCESS";
export const SEND_MESSAGE_FAIL = "SEND_MESSAGE_FAIL";

export const CLEAR_SEND_ERROR = "CLEAR_SEND_ERROR";

export const sendMessage = (messageData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SEND_MESSAGE_START });
      await fetch(`https://college-app-991d6.firebaseio.com/contactus.json`, {
        method: "POST",
        body: JSON.stringify(messageData),
      });
      dispatch({ type: SEND_MESSAGE_SUCCESS });
    } catch (error) {
      dispatch({ type: SEND_MESSAGE_FAIL, payload: error });
    }
  };
};
