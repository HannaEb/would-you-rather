import QuestionService from "../services/question.service";

export const GET_QUESTION = "GET_QUESTION";

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
