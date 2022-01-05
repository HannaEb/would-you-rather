import React from 'react';
import { Alert } from 'reactstrap';

const Error = () => {
    return (
        <div>
            <Alert className='text-center' color='light'>
                <h1 className='alert-heading'>404</h1>
                <p>Page not found</p>
            </Alert>
        </div>
    )
}

export default Error;
