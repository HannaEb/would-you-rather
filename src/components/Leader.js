import React, { Component } from 'react';
import { connect } from 'react-redux';

class Leader extends Component {
    render() {

        const { leader } = this.props

        const answeredQuestions = Object.keys(leader.answers).length
        const createdQuestions = leader.questions.length
        const score = answeredQuestions + createdQuestions

        return (
            <div>
                <h4>{leader.name}</h4>
                <p>Test</p>
                <p>Answered questions: {answeredQuestions}</p>
                <p>Created questions: {createdQuestions}</p>
                <p>Score: {score}</p>
            </div>
        )
    }
}

function mapStateToProps({ users }, { id }) {
    const leader = users[id]
    return {
        leaders: users,
        leader: leader
            ? leader
            : null
    }
}

export default connect(mapStateToProps)(Leader);
