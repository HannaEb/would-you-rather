import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuestionDetails from './QuestionDetails';
import QuestionResults from './QuestionResults';

class QuestionPage extends Component {
    render() {

        const { id, user } = this.props
        const answered = (user.answers).hasOwnProperty(id)

        return (
            <div>
                {answered === false
                    ? <QuestionDetails id={id} />
                    : <QuestionResults id={id} />
                }    
            </div>
        )
    }
}

function mapStateToProps({ users, authedUser }, props) {
    const { id } = props.match.params
    const user = users[authedUser]
    return {
        id,
        user
    }
}

export default connect(mapStateToProps)(QuestionPage);
