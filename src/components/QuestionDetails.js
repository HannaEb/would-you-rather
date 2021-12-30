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
        const { question } = this.props
        const { author, optionOne, optionTwo } = question

        return (
            <div>
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

function mapStateToProps({ questions, authedUser }, { id })  {
    const question = questions[id]
    
    return {
        question,
        authedUser
    }
}

export default connect(mapStateToProps)(QuestionDetails)
