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

export const login = (username, password) => async (dispatch) => {
  try {
    const res = await AuthDataService.login(username, password);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user: res },
    });
    return Promise.resolve(res.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const logout = () => async (dispatch) => {
  try {
    await AuthDataService.logout();
    dispatch({
      type: LOGOUT,
    });
  } catch (error) {
    console.log(error);
  }
};
