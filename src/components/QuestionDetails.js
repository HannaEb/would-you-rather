import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader, CardBody, CardImg, CardTitle, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { handleUpdateQuestion } from '../actions/questions';

class QuestionDetails extends Component {
    state = {
        answer: null
    }

    handleChange = (event) => {
        this.setState({
            answer: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const { dispatch, id, authedUser } = this.props
        const { answer } = this.state

        dispatch(handleUpdateQuestion({
            authedUser,
            qid: id, 
            answer
        }))  
    }

    render() {
        
        const { answer } = this.state
        const { question, avatar } = this.props
        const { author, optionOne, optionTwo } = question

        return (
            <Card className='mt-4'>
                <CardHeader>{author} asks:</CardHeader>
                <CardBody>
                    <div className='row'>
                        <div className='col my-auto'>
                            <CardImg width='100%' className='d-block m-auto card-avatar' src={avatar} alt='Avatar'></CardImg>
                        </div>
                        <div className='col-auto my-auto'>
                            <CardTitle tag='h5'>Would you rather...</CardTitle>
                            <Form>
                                <FormGroup check>
                                    <Label check>
                                        <Input 
                                            type='radio' 
                                            value='optionOne'
                                            checked={this.state.answer === 'optionOne'}
                                            onChange={this.handleChange}
                                        />
                                        {optionOne.text}
                                    </Label>  
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input 
                                            type='radio' 
                                            value='optionTwo'
                                            checked={this.state.answer === 'optionTwo'}
                                            onChange={this.handleChange}
                                        />
                                        {optionTwo.text}
                                    </Label>  
                                </FormGroup>
                                <Button className='mt-3' color='info' onClick={this.handleSubmit} disabled={answer === null}>Submit</Button>
                            </Form>
                        </div>
                    </div>
                </CardBody>
            </Card>
        )
    }
}

function mapStateToProps({ questions, authedUser, users }, { id })  {
    const question = questions[id]
    const avatar = users[question.author].avatarURL
    
    return {
        question,
        authedUser,
        avatar
    }
}

export default connect(mapStateToProps)(QuestionDetails)
