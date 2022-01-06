import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader, CardBody, CardImg, CardTitle, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { handleUpdateQuestion } from '../actions/questions';

const QuestionDetails = props => {
    
    const [answer, setAnswer] = useState(null)
    
    const handleChange = (event) => {
        setAnswer(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const { dispatch, id, authedUser } = props

        dispatch(handleUpdateQuestion({
            authedUser,
            qid: id, 
            answer
        }))  
    }

    const { question, avatar } = props
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
                                        checked={answer === 'optionOne'}
                                        onChange={handleChange}
                                    />
                                    {optionOne.text}
                                </Label>  
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input 
                                        type='radio' 
                                        value='optionTwo'
                                        checked={answer === 'optionTwo'}
                                        onChange={handleChange}
                                    />
                                    {optionTwo.text}
                                </Label>  
                            </FormGroup>
                            <Button className='mt-3' color='info' onClick={handleSubmit} disabled={answer === null}>Submit</Button>
                        </Form>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
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
