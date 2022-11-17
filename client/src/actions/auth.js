import AuthService from "../services/auth.service";

export const LOGOUT = "LOGOUT";
export const SET_MESSAGE = "SET_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";

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
