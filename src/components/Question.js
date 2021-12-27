import React, { Component } from 'react';
import { connect } from 'react-redux';

class Question extends Component {
    render() {

        const { question } = this.props

        const { author, optionOne, optionTwo } = question

        return (
            <div>
                <p>{author} asks:</p>
                <h3>Would you rather...?</h3>
                <p>{optionOne.text}</p>
                <p>{optionTwo.text}</p>
            </div>
        )
    }
}

function mapStateToProps({ questions }, { id }) {
    const question = questions[id]
    return {
        question: question 
            ? question
            : null
    }
}

export default connect(mapStateToProps)(Question);
