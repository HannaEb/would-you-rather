import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleUpdateQuestion } from '../actions/questions';

class QuestionDetails extends Component {
    state = {
        answer: null
    }

    handleChange = (event) => {
        this.setState({
            answer: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const { dispatch, id, authedUser } = this.props
        const { answer } = this.state

        dispatch(handleUpdateQuestion({
            authedUser,
            qid: id, 
            answer
        }))  
    }

    render() {
        
        const { answer } = this.state
        const { question, avatar } = this.props
        const { author, optionOne, optionTwo } = question

        return (
            <div>
                <img src={avatar} alt='Avatar' width='50'></img>
                <h3>{author} asks:</h3>
                <h2>Would you rather...</h2>
                <form>
                    <div>
                        <input 
                            type='radio'
                            value='optionOne'
                            checked={this.state.answer === 'optionOne'}
                            onChange={this.handleChange}
                        />
                        <label htmlFor='optionOne'>{optionOne.text}</label>
                    </div>
                    <div>
                        <input 
                            type='radio'
                            value='optionTwo'
                            checked={this.state.answer === 'optionTwo'}
                            onChange={this.handleChange}
                        />
                        <label htmlFor='optionTwo'>{optionTwo.text}</label>
                    </div>
                </form>
                <button onClick={this.handleSubmit} disabled={answer === null}>Submit</button>
            </div>
        )
    }
}

function mapStateToProps({ questions, authedUser, users }, { id })  {
    const question = questions[id]
    const avatar = users[question.author].avatarURL
    
    return {
        question,
        authedUser,
        avatar
    }
}

export default connect(mapStateToProps)(QuestionDetails)
