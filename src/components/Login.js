import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Row, Col, Card, CardHeader, CardTitle, CardText, CardBody, CardImg, Form, FormGroup, Input, Button } from 'reactstrap';
import { setAuthedUser } from '../actions/authedUser';
import logo from '../images/logo.png';

const Login = props => {

    const [selectedUser, setSelectedUser] = useState(null)
    const [toHome, setToHome] = useState(false)
   
    const handleChange = event => {
        setSelectedUser(event.target.value)
    }

    const handleLogin = event => {
        event.preventDefault()
        const { dispatch } = props

        dispatch(setAuthedUser(selectedUser))

        setToHome(true)
    }

    const { users } = props

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
                                    <Input type='select' defaultValue='' onChange={handleChange}>
                                        <option value='' disabled>Select user...</option>
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
                                    onClick={handleLogin}  
                                    disabled={selectedUser === null}
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

function mapStateToProps({ users }) {
    return {
      users
    };
  }

export default connect(mapStateToProps)(Login);
