import AuthDataService from "../services/auth.service";

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";
export const SET_MESSAGE = "SET_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";

export const register = (username, avatar, password) => async (dispatch) => {
  try {
    const res = await AuthDataService.register(username, avatar, password);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
    });
    return Promise.reject(error);
  }
};

// export const register = (username, avatar, password) => (dispatch) => {
//   return AuthDataService.register(username, avatar, password).then(
//     (response) => {
//       dispatch({
//         type: REGISTER_SUCCESS,
//         payload: response.data,
//       });
//       dispatch({
//         type: CLEAR_MESSAGE,
//       });
//       return Promise.resolve();
//     },
//     (error) => {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       dispatch({
//         type: REGISTER_FAIL,
//       });
//       dispatch({
//         type: SET_MESSAGE,
//         payload: message,
//       });
//       return Promise.reject();
//     }
//   );
// };

export const login = (username, password) => (dispatch) => {
  return AuthDataService.login(username, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });
      dispatch({
        type: CLEAR_MESSAGE,
      });
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: LOGIN_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthDataService.logout();
  dispatch({
    type: LOGOUT,
  });
};
