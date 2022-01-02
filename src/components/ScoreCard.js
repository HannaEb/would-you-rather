import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Badge } from 'reactstrap';

class ScoreCard extends Component {
    render() {

        const { score } = this.props

        return (
            <Card>
                <CardHeader className='text-center'>Score</CardHeader>
                <CardBody className='text-center'>
                    <Badge className='score-badge' color='info' pill>{score}</Badge>
                </CardBody>
            </Card>
        )
    }
}

export default ScoreCard;
