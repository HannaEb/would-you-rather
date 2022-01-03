import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Row, Col, Card, CardHeader, CardTitle, CardText, CardBody, CardImg, Form, FormGroup, Input, Button } from 'reactstrap';
import { setAuthedUser } from '../actions/authedUser';
import logo from '../images/logo.png';

class Login extends Component {
    state = {
        authedUser: null,
        toHome: false
    }

    handleChange = event => {
        this.setState(() => ({
            authedUser: event.target.value,
        }))
    }

    handleLogin = event => {
        event.preventDefault()
        const { dispatch } = this.props
        const { authedUser } = this.state

        dispatch(setAuthedUser(authedUser))

        this.setState(() => ({
            toHome: true
        }))  
    }

    render() {
        const { users } = this.props
        const { toHome, authedUser } = this.state

        if (toHome === true) {
            return <Redirect to='/' />
        }

        return (
            <div className='container mt-4'>
                <Row className='justify-content-center'>
                    <Col md='auto'>
                        <Card>
                            <CardHeader className='text-center'>
                                <CardTitle tag='h5'>Welcome to the Would You Rather App!</CardTitle>
                                <CardText>Please sign in to continue</CardText>
                            </CardHeader>
                            <CardBody>
                                <CardImg width='80%' className='d-block m-auto' src={logo}></CardImg>
                                <CardText className='text-center' tag='h5' color='info'>Sign in</CardText>
                                <Form>
                                    <FormGroup>
                                        <Input type='select' onChange={this.handleChange}>
                                            <option selected disabled>Select user...</option>
                                            {(Object.values(users) || []).map((user) => {
                                                return (
                                                    <option value={user.id} key={user.id}>{ user.name }</option>
                                                )
                                             })}
                                        </Input>
                                    </FormGroup>
                                    <Button
                                        block
                                        color='info' 
                                        onClick={this.handleLogin}  
                                        disabled={authedUser === null}
                                    >
                                        Login
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

function mapStateToProps({ users }) {
    return {
      users
    };
  }

export default connect(mapStateToProps)(Login);
