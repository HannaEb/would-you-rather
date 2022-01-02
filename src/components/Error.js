import React, { Component } from 'react';
import { Alert } from 'reactstrap';

class Error extends Component {
    render() {
        return (
            <div>
                <Alert className='text-center' color='light'>
                    <h1 className='alert-heading'>404</h1>
                    <p>Page not found</p>
                </Alert>
            </div>
        )
    }
}

export default Error;
