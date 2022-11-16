import QuestionService from "../services/question.service";

export const GET_QUESTION = "GET_QUESTION";
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
