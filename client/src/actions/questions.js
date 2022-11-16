import { updateUserAnswers } from "./users";
import QuestionService from "../services/question.service";

export const GET_QUESTION = "GET_QUESTION";
export const UPDATE_QUESTION = "UPDATE_QUESTION";
export const DELETE_QUESTION = "DELETE_QUESTION";

export const getQuestion = (id) => async (dispatch) => {
  try {
    const res = await QuestionService.get(id);
    const question = res.data.question;
    dispatch({
      type: GET_QUESTION,
      payload: question,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateQuestion = (id, data) => async (dispatch, getState) => {
  const { auth } = getState();
  const answer = data.answer;
  const authedUser = auth.user.id;
  try {
    const res = await QuestionService.update(id, { data });
    dispatch({
      type: UPDATE_QUESTION,
      payload: {
        id,
        authedUser,
        answer,
      },
    });
    dispatch(updateUserAnswers(id, authedUser, answer));
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
