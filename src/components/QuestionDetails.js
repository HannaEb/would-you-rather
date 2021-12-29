import React, { Component } from 'react';
import { connect } from 'react-redux';

class QuestionDetails extends Component {
    render() {
        
        const { question } = this.props
        const { author, optionOne, optionTwo } = question

        return (
            <div>
                <h3>{author} asks:</h3>
                <h2>Would you rather...</h2>
                <form>
                    <div>
                        <input type='radio' id='optionOne' name='answer'></input>
                        <label htmlFor='optionOne'>{optionOne.text}</label>
                    </div>
                    <div>
                        <input type='radio' id='optionTwo' name='answer'></input>
                        <label htmlFor='optionTwo'>{optionTwo.text}</label>
                    </div>
                </form>
                <button>Submit</button>
            </div>
        )
    }
}

function mapStateToProps({ questions }, { id })  {
    const question = questions[id]
    
    return {
        question
    }
}

export default connect(mapStateToProps)(QuestionDetails)
