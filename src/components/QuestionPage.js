import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuestionDetails from './QuestionDetails';
import QuestionResults from './QuestionResults';
import Error from './Error';

class QuestionPage extends Component {
    render() {

        const { id, user, invalid } = this.props
        const answered = (user.answers).hasOwnProperty(id)

        if (invalid) {
            return <Error />
        } else {
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
}

function mapStateToProps({ users, authedUser, questions }, props) {
    const { id } = props.match.params
    const user = users[authedUser]
    let invalid
    
    if (questions[id] === undefined) {
        invalid = true
    } else {
        invalid = false
    }

    return {
        id,
        user,
        invalid
    }
}

export default connect(mapStateToProps)(QuestionPage);
