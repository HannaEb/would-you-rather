import React, { Component } from 'react';
import { connect } from 'react-redux';
import { calculatePercentage } from '../utils/helpers';

class QuestionResults extends Component {
    render(){

        const { question } = this.props
        const { author, optionOne, optionTwo } = question
        const optionOneVotes = (optionOne.votes).length
        const optionTwoVotes = (optionTwo.votes).length
        const totalVotes = optionOneVotes + optionTwoVotes
        
        return (
            <div>
                <h3>Asked by {author}</h3>
                <h2>Results:</h2>
                <div>
                    <h4>Would you rather {optionOne.text}?</h4>
                    <p>{calculatePercentage(optionOneVotes, totalVotes)}%</p>
                    <p>{optionOneVotes} out of {totalVotes} votes</p>
                </div>
                <div>
                    <h4>Would you rather {optionTwo.text}?</h4>
                    <p>{calculatePercentage(optionTwoVotes, totalVotes)}%</p>
                    <p>{optionTwoVotes} out of {totalVotes} votes</p>
                </div>
            </div>
        )
    }
}

function mapStateToProps({questions}, { id }) {
    const question = questions[id]

    return {
        question
    }
}

export default connect(mapStateToProps)(QuestionResults);
