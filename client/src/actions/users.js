export const UPDATE_USER_ANSWERS = "UPDATE_USER_ANSWERS";

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
