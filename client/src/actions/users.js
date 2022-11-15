export const UPDATE_USER_QUESTIONS = "UPDATE_USER_QUESTIONS";
export const UPDATE_USER_ANSWERS = "UPDATE_USER_ANSWERS";

export const updateUserQuestions = (id, author) => {
  return {
    type: UPDATE_USER_QUESTIONS,
    payload: {
      id,
      author,
    },
  };
};

export const updateUserAnswers = (id, authedUser, answer) => {
  return {
    type: UPDATE_USER_ANSWERS,
    payload: {
      id,
      authedUser,
      answer,
    },
  };
};
