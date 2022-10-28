import { updateUserQuestions, updateUserAnswers } from "./users";
import QuestionService from "../services/question.service";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const CREATE_QUESTION = "CREATE_QUESTION";
export const UPDATE_QUESTION = "UPDATE_QUESTION";
export const DELETE_QUESTION = "DELETE_QUESTION";

export const receiveQuestions = () => async (dispatch) => {
  try {
    const res = await QuestionService.getAll();
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
    const authorId = auth.user.id;
    try {
      const res = await QuestionService.create({
        authorId,
        optionOneText,
        optionTwoText,
      });
      const question = res.data.question;
      dispatch({
        type: CREATE_QUESTION,
        payload: question,
      });
      dispatch(updateUserQuestions(question.id, authorId));
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
    const res = await QuestionService.update(id, { data });
    dispatch({
      type: UPDATE_QUESTION,
      payload: {
        id,
        authedUserId,
        answer,
      },
    });
    dispatch(updateUserAnswers(id, authedUserName, answer));
    return Promise.resolve(res.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteQuestion = (id) => async (dispatch) => {
  try {
    await QuestionService.deleteOne(id);
    dispatch({
      type: DELETE_QUESTION,
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};
