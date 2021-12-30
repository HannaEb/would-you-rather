import { saveQuestion, saveQuestionAnswer } from '../utils/api';
import { updateUserQuestions, updateUserAnswers } from './users';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const UPDATE_QUESTION = 'UPDATE_QUESTION'

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const { authedUser } = getState()

        return saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser
        })
            .then(question => {
                dispatch(addQuestion(question))
                dispatch(updateUserQuestions(question))
            })
    }
}

function updateQuestion({ authedUser, qid, answer }) {
    return {
        type: UPDATE_QUESTION,
        authedUser,
        qid,
        answer
    }
}

export function handleUpdateQuestion(authedUser, qid, answer) {
    return (dispatch) => {

        dispatch(updateQuestion(authedUser, qid, answer))
        dispatch(updateUserAnswers(authedUser, qid, answer))

        return saveQuestionAnswer(authedUser, qid, answer)   
    }
}
