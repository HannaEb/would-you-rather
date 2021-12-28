import React, { Component } from 'react';
import { connect } from 'react-redux';

class Leaderboard extends Component {
    render() {

        const  { users }  = this.props

        return (
            <div>
                <ul>
                    {users.map(user => {
                        const answeredQuestions = Object.keys(user.answers).length
                        const createdQuestions = user.questions.length
                        const score = answeredQuestions + createdQuestions
                        return (
                            <li key={user.id}>
                                <h4>{user.name}</h4>
                                <p>Answered questions: {answeredQuestions}</p>
                                <p>Created questions: {createdQuestions}</p>
                                <p>Score: {score}</p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({ users }) {
    return {
        users: Object.values(users)
    }
}

export default connect(mapStateToProps)(Leaderboard);
