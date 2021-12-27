import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';

class Dashboard extends Component {
    render() {

        const { authedUser } = this.props;

        const answeredQuestions = this.props.questions.filter(
                question => question.optionOne.votes.includes(authedUser) 
                || question.optionTwo.votes.includes(authedUser))

        const unansweredQuestions = this.props.questions.filter(
                question => !question.optionOne.votes.includes(authedUser)
                && !question.optionTwo.votes.includes(authedUser))            
                    
        return (
            <div>
                <div>
                    <h3>Answered Polls</h3>
                    <ul>
                        {answeredQuestions.map(question => (
                            <li key={question.id}>
                                <Question id={question.id} />
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3>Unanswered Polls</h3>
                    <ul>
                    {unansweredQuestions.map(question => (
                            <li key={question.id}>
                                <Question id={question.id} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, questions }) {
    return {
        authedUser,
        questions: Object.values(questions).sort((a, b) => 
            b.timestamp - a.timestamp)
    }
}

export default connect(mapStateToProps)(Dashboard);
