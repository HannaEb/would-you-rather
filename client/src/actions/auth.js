import AuthService from "../services/auth.service";

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";
export const SET_MESSAGE = "SET_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";

export const register = (username, avatar, password) => async (dispatch) => {
  try {
    const res = await AuthService.register({ username, avatar, password });
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch({
      type: CLEAR_MESSAGE,
    });
    return Promise.resolve(res.data);
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
    });
    dispatch({
      type: SET_MESSAGE,
      payload: error.message,
    });
    return Promise.reject(error);
  }
};

export const login = (username, password) => async (dispatch) => {
  try {
    const res = await AuthService.login({ username, password });
    console.log("Res", res);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.user,
    });
    dispatch({
      type: CLEAR_MESSAGE,
    });
    return Promise.resolve(res.data);
  } catch (error) {
    console.log("Action Error", error);
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
