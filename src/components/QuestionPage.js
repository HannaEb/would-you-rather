import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuestionDetails from './QuestionDetails';
import QuestionResults from './QuestionResults';

class QuestionPage extends Component {
    render() {

        const { id } = this.props

        return (
            <div>
                <QuestionDetails id={id} />
                <QuestionResults id={id} />
            </div>
        )
    }
}

function mapStateToProps({ questions }, props) {
    const { id } = props.match.params
    
    return {
        id
    }
}

export default connect(mapStateToProps)(QuestionPage);
