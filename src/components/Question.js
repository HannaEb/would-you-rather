import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const Question = props => {

    const question = useSelector(state => state.questions[props.id])
    const users = useSelector(state => state.users)

    const avatar = users[question.author].avatarURL
    const { id, author, optionOne, optionTwo } = question

    return (
        <Card className='mt-4'>
            <CardHeader>{author} asks:</CardHeader>
            <CardBody>
                <div className='row'>
                    <div className='col'>
                        <CardImg width='100%' className='d-block m-auto card-avatar' src={avatar} alt='Avatar'></CardImg>
                    </div>
                    <div className='col'>
                        <CardTitle tag='h5'>Would you rather...</CardTitle>
                        <CardText>...{optionOne.text.substring(0, 20)}...</CardText>
                        <CardText>...{optionTwo.text.substring(0, 20)}...</CardText>
                        <Link to={`/questions/${id}`}>
                            <Button outline color='secondary'>View Details</Button>
                        </Link>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export default Question;
