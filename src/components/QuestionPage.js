import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'reactstrap';
import QuestionDetails from './QuestionDetails';
import QuestionResults from './QuestionResults';
import Error from './Error';

const QuestionPage = props => {
    
    const authedUser = useSelector(state => state.authedUser)
    const user = useSelector(state => state.users[authedUser])
    const questions = useSelector(state => state.questions)

    const { id } = props.match.params
    const answered = (user.answers).hasOwnProperty(id)

    let invalid

    if (questions[id] === undefined) {
        invalid = false
    } else {
        invalid = false
    }
    
    if (invalid) {
        return <Error />
    } else {
        return (
            <div className='container'>
                <Row className='justify-content-center'>
                    <Col md='auto'>
                    {answered === false 
                        ? <QuestionDetails id={id} />
                        : <QuestionResults id={id} />
                    }   
                    </Col>
                </Row>
            </div>
        )
    }
}

export default QuestionPage;
