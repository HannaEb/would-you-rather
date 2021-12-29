import React, { Component } from 'react';
import { connect } from 'react-redux';
import { calculatePercentage } from '../utils/helpers';

class QuestionResults extends Component {
    render(){

        const { question, authedUser } = this.props
        const { author, optionOne, optionTwo } = question
        const optionOneVotes = (optionOne.votes).length
        const optionTwoVotes = (optionTwo.votes).length
        const totalVotes = optionOneVotes + optionTwoVotes
        const optionOneChoice = (optionOne.votes).includes(authedUser)
        const optionTwoChoice = (optionTwo.votes).includes(authedUser)
        
        return (
            <div>
                <h3>Asked by {author}</h3>
                <h2>Results:</h2>
                <div>
                    <h4>Would you rather {optionOne.text}?</h4>
                    <p>{calculatePercentage(optionOneVotes, totalVotes)}%</p>
                    <p>{optionOneVotes} out of {totalVotes} votes</p>
                    {optionOneChoice && (
                        <p>You chose this option</p>
                    )}
                </div>
                <div>
                    <h4>Would you rather {optionTwo.text}?</h4>
                    <p>{calculatePercentage(optionTwoVotes, totalVotes)}%</p>
                    <p>{optionTwoVotes} out of {totalVotes} votes</p>
                    {optionTwoChoice && (
                        <p>You chose this option</p>
                    )}
                </div>
            </div>
        )
    }
}

function mapStateToProps({ questions, authedUser }, { id }) {
    const question = questions[id]

    return {
        question, 
        authedUser
    }
}

export default connect(mapStateToProps)(QuestionResults);
