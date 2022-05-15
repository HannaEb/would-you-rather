import produce from "immer";
import {
  RECEIVE_USERS,
  UPDATE_USER_QUESTIONS,
  UPDATE_USER_ANSWERS,
} from "../actions/users";

const initialState = {};

const users = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.payload.reduce(
          (users, user) => ({ ...users, [user.username]: user }),
          {}
        ),
      };
    case UPDATE_USER_QUESTIONS:
      return produce(state, (draft) => {
        draft[action.question.author].questions = draft[
          action.question.author
        ].questions.concat([action.question.id]);
      });
    case UPDATE_USER_ANSWERS:
      return produce(state, (draft) => {
        draft[action.authedUser].answers = draft[
          action.authedUser
        ].answers.concat({ id: action.id, answer: action.answer });
      });
    default:
      return state;
  }
};

export default users;
