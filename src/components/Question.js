import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Question extends Component {
    render() {

        const { question } = this.props

        const { id, author, optionOne, optionTwo } = question

        return (
            <Link to={`/questions/${id}`}>
                <p>{author} asks:</p>
                <h3>Would you rather...?</h3>
                <p>{optionOne.text}</p>
                <p>{optionTwo.text}</p>
            </Link>
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
