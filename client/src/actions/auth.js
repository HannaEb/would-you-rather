import AuthService from "../services/auth.service";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";
export const SET_MESSAGE = "SET_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";

export const login = (username, password) => async (dispatch) => {
  try {
    const res = await AuthService.login({ username, password });
    res.data.user.accessToken = res.data.accessToken;
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.user,
    });
    dispatch({
      type: CLEAR_MESSAGE,
    });
    return Promise.resolve(res.data);
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
    });
    dispatch({
      type: SET_MESSAGE,
      payload: error.response.data.message,
    });
    return Promise.reject(error);
  }
};

export const logout = () => async (dispatch) => {
  try {
    await AuthService.logout();
    dispatch({
      type: LOGOUT,
    });
  } catch (error) {
    console.log(error);
  }
};
