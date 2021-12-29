import React, { Component } from 'react';
import { connect } from 'react-redux';

class QuestionPage extends Component {
    render() {

        const { id } = this.props

        return (
            <div>
                <p>{id}</p>
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
