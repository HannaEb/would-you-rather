import { updateUserQuestions, updateUserAnswers } from "./users";
import QuestionDataService from "../services/question.service";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const CREATE_QUESTION = "ADD_QUESTION";
export const UPDATE_QUESTION = "UPDATE_QUESTION";
export const DELETE_QUESTION = "DELETE_QUESTION";

export const receiveQuestions = () => async (dispatch) => {
  try {
    const res = await QuestionDataService.getAll();
    dispatch({
      type: RECEIVE_QUESTIONS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createQuestion =
  (optionOneText, optionTwoText) => async (dispatch, getState) => {
    const { auth } = getState();

    try {
      const res = await QuestionDataService.create({
        optionOneText,
        optionTwoText,
        author: auth.user.username,
        userId: auth.user.id,
      });
      dispatch({
        type: CREATE_QUESTION,
        payload: res.data,
      });
      dispatch(updateUserQuestions(res.data));
      return Promise.resolve(res.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

export const updateQuestion = (id, data) => async (dispatch, getState) => {
  const { auth } = getState();
  const answer = data.answer;
  const authedUserId = auth.user.id;
  const authedUserName = auth.user.username;

  try {
    const res = await QuestionDataService.update(id, data);
    const question = res.data;

    dispatch({
      type: UPDATE_QUESTION,
      question,
      authedUserId,
      answer,
    });
    dispatch(updateUserAnswers(question.id, authedUserName, answer));

    return Promise.resolve(res.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteQuestion = (id) => async (dispatch, getState) => {
  const { auth } = getState();
  const authedUserId = auth.user.id;

  try {
    await QuestionDataService.delete(id, { authedUserId });

    dispatch({
      type: DELETE_QUESTION,
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};
