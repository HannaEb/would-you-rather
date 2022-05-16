import { showLoading, hideLoading } from "react-redux-loading-bar";
import UserDataService from "../services/user.service";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const UPDATE_USER_QUESTIONS = "UPDATE_USER_QUESTIONS";
export const UPDATE_USER_ANSWERS = "UPDATE_USER_ANSWERS";

export const receiveUsers = () => async (dispatch) => {
  dispatch(showLoading());
  try {
    const res = await UserDataService.getAll();
    dispatch(hideLoading());
    dispatch({
      type: RECEIVE_USERS,
      payload: res.data,
    });
  } catch (error) {
    dispatch(hideLoading());
    console.log(error);
  }
};

export const updateUserQuestions = (question) => {
  return {
    type: UPDATE_USER_QUESTIONS,
    question,
  };
};

export const updateUserAnswers = (id, authedUser, answer) => {
  return {
    type: UPDATE_USER_ANSWERS,
    id,
    authedUser,
    answer,
  };
};
