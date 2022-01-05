import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, List } from 'reactstrap';
import Leader from './Leader';

const Leaderboard = props => {

    const { users } = props

    return (
        <div className='container'>
            <Row className='justify-content-center'>
                <Col md='auto'>
                    <List type='unstyled'>
                        {users.map(user => (
                            <li key={user.id}>
                                <Leader id={user.id} />
                            </li>
                        ))}
                    </List>
                </Col>
            </Row>
        </div>
    )
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
