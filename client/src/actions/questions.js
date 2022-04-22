import { saveQuestion, saveQuestionAnswer } from "../utils/api";
import { updateUserQuestions, updateUserAnswers } from "./users";
import QuestionDataService from "../services/question.service";
import { useSelector } from "react-redux";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const CREATE_QUESTION = "ADD_QUESTION";
export const UPDATE_QUESTION = "UPDATE_QUESTION";

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

// const createQuestion = (question) => {
//   return {
//     type: CREATE_QUESTION,
//     payload: question,
//   };
// };

// export const handleCreateQuestion =
//   (optionOneText, optionTwoText) => async (dispatch, getState) => {
//     const { authedUser } = getState();
//     try {
//       const res = await QuestionDataService.create({
//         optionOneText,
//         optionTwoText,
//         author: authedUser,
//       });
//       dispatch(createQuestion(res.data));
//       return Promise.resolve(res.data);
//     } catch (error) {
//       return Promise.reject(error);
//     }
//   };

export const createQuestion =
  (optionOneText, optionTwoText) => async (dispatch, getState) => {
    const { authedUser } = getState();
    try {
      const res = await QuestionDataService.create({
        optionOneText,
        optionTwoText,
        author: authedUser,
      });
      dispatch({
        type: CREATE_QUESTION,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

export const updateQuestion = (id, data) => async (dispatch, getState) => {
  const { authedUser } = getState();
  const answer = data.answer;
  try {
    const res = await QuestionDataService.update(id, data);
    const q = res.data;

    dispatch({
      type: UPDATE_QUESTION,
      // payload: res.data
      q,
      authedUser,
      answer,
    });

    return Promise.resolve(res.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

// export function receiveQuestions(questions) {
//   return {
//     type: RECEIVE_QUESTIONS,
//     questions,
//   };
// }

// export const updateQuestion = (authedUser, qid, answer) => async (dispatch) => {
//   try {
//     const res = await QuestionDataService.update(authedUser, qid, answer);
//     dispatch({
//       type: UPDATE_QUESTION,
//       payload: res.data,
//     });
//     return Promise.resolve(res.data);
//   } catch (error) {
//     return Promise.reject(error);
//   }
// };

// function updateQuestion({ authedUser, qid, answer }) {
//   return {
//     type: UPDATE_QUESTION,
//     authedUser,
//     qid,
//     answer,
//   };
// }

// export function handleUpdateQuestion(authedUser, qid, answer) {
//   return (dispatch) => {
//     dispatch(updateQuestion(authedUser, qid, answer));
//     dispatch(updateUserAnswers(authedUser, qid, answer));

//     return saveQuestionAnswer(authedUser, qid, answer);
//   };
// }
