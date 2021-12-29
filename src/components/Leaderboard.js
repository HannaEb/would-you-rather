import React, { Component } from 'react';
import { connect } from 'react-redux';
import Leader from './Leader';

class Leaderboard extends Component {
    render() {

        const { users } = this.props

        return (
            <div>
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            <Leader id={user.id} />
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({ users }) {
    return {
        users: Object.values(users).map(user => ({
            score: Object.keys(user.answers).length + Object.keys(user.questions).length,
            ...user
        })).sort((a, b) => b.score - a.score)
    }
}

export default connect(mapStateToProps)(Leaderboard);
