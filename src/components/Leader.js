import React, { Component } from 'react';
import { connect } from 'react-redux';

class Leader extends Component {
    render() {

        const { leader, avatar } = this.props

        const answeredQuestions = Object.keys(leader.answers).length
        const createdQuestions = leader.questions.length
        const score = answeredQuestions + createdQuestions

        return (
            <div>
                <h4>{leader.name}</h4>
                <img src={avatar} alt='Avatar' width='50'></img>
                <p>Answered questions: {answeredQuestions}</p>
                <p>Created questions: {createdQuestions}</p>
                <p>Score: {score}</p>
            </div>
        )
    }
}

function mapStateToProps({ users }, { id }) {
    const leader = users[id]
    const avatar = leader.avatarURL

    return {
        avatar,
        leaders: users,
        leader: leader
            ? leader
            : null
    }
}

export default connect(mapStateToProps)(Leader);
