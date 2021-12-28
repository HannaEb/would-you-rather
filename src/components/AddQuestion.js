import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/questions';

class AddQuestion extends Component {
    state = {
        optionOneText: '',
        optionTwoText: '',
    }

    handleOptionOneChange = event => {
        const optionOneText  = event.target.value

        this.setState(() => ({
            optionOneText
        }))
    }

    handleOptionTwoChange = event => {
        const optionTwoText = event.target.value

        this.setState(() => ({
            optionTwoText
        }))
    }

    handleSubmit = event => {
        event.preventDefault()

        const { optionOneText, optionTwoText } = this.state
        const { dispatch } = this.props

        dispatch(handleAddQuestion(optionOneText, optionTwoText))

        this.setState(() => ({
            optionOneText: '',
            optionTwoText: ''
        }))
    }

    render() {
        const { optionOneText, optionTwoText } = this.state
        return (
            <div>
                <h3>Would you rather...?</h3>
                <form onSubmit={this.handleSubmit}>
                    <textarea
                        placeholder='Enter Option One'
                        value={optionOneText}
                        onChange={this.handleOptionOneChange}
                        maxLength={80}
                    />
                    <textarea
                        placeholder='Enter Option Two'
                        value={optionTwoText}
                        onChange={this.handleOptionTwoChange}
                        maxLength={80}
                    />
                    <button
                        type='submit'
                        disabled={optionOneText === '' || optionTwoText === ''}>
                            Add
                    </button>
                </form>
            </div>
        )
    }
}

export default connect()(AddQuestion);
