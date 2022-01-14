import produce from 'immer';
import { RECEIVE_USERS, UPDATE_USER_QUESTIONS, UPDATE_USER_ANSWERS } from '../actions/users';

export default function users(state = {}, action) {
    switch(action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case UPDATE_USER_QUESTIONS:
            return produce(state, draft => {
                draft[action.question.author].questions = 
                    draft[action.question.author].questions.concat([action.question.id])
            })
        case UPDATE_USER_ANSWERS:
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    answers: {
                        ...state[action.authedUser].answers,
                        [action.qid]: action.answer
                    }
                }
            }
        default:
            return state
    }
}
