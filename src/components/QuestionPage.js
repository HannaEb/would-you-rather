import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuestionDetails from './QuestionDetails';

class QuestionPage extends Component {
    render() {

        const { id } = this.props

        return (
            <div>
                <QuestionDetails id={id} />
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
