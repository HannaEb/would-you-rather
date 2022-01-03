import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Row, Col, Card, CardHeader, CardBody, CardTitle, Form, FormGroup, FormText, Input, Button } from 'reactstrap';
import { handleAddQuestion } from '../actions/questions';

class AddQuestion extends Component {
    state = {
        optionOneText: '',
        optionTwoText: '',
        toHome: false
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
            optionTwoText: '',
            toHome: true
        }))
    }

    render() {
        const { optionOneText, optionTwoText, toHome } = this.state

        if (toHome === true) {
            return <Redirect to='/' />
        }

        return (
            <div className='container'>
                <Row className='justify-content-center'>
                    <Col md='auto'>
                        <Card>
                            <CardHeader tag='h3'>Create New Question</CardHeader>
                            <CardBody>
                                <CardTitle tag='h5'>Would you rather...</CardTitle>
                                <Form>
                                    <FormGroup>
                                        <Input 
                                            type='text'
                                            value={optionOneText}
                                            onChange={this.handleOptionOneChange}
                                            maxLength={100}
                                        />
                                    </FormGroup>
                                    <FormText tag='p' className='text-center'>or</FormText>
                                    <FormGroup>
                                        <Input 
                                            type='text'
                                            value={optionTwoText}
                                            onChange={this.handleOptionTwoChange}
                                            maxLength={100}
                                        />
                                    </FormGroup>
                                    <Button 
                                        block
                                        color='info' 
                                        onClick={this.handleSubmit} 
                                        disabled={optionOneText === '' || optionTwoText === ''}
                                    >
                                        Add
                                    </Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default connect()(AddQuestion);
