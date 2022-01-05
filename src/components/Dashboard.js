import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem, NavLink, TabContent, TabPane, Row, Col, List } from 'reactstrap';
import Question from './Question';
import classnames from 'classnames';

const Dashboard = props => {

    const [activeTab, setActiveTab] = useState('unanswered')

    const handleToggle = tab => {
        if (activeTab !== tab) {
            setActiveTab(tab)
        }
    }

    const { authedUser, questions } = props

    const unansweredQuestions = questions.filter(
        question => !question.optionOne.votes.includes(authedUser)
        && !question.optionTwo.votes.includes(authedUser))     

    const answeredQuestions = questions.filter(
            question => question.optionOne.votes.includes(authedUser) 
            || question.optionTwo.votes.includes(authedUser))
    
    return (
        <div className='container'>
            <Row className='justify-content-center'>
                <Col md='auto'>
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === 'unanswered'})}
                                onClick={() => handleToggle('unanswered')}>
                                    Unanswered Questions
                            </NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink
                                className={classnames({ active: activeTab === 'answered'})}
                                onClick={() => handleToggle('answered')}>
                                    Answered Questions
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId='unanswered'>
                            <Row>
                                <Col>
                                    <List type='unstyled'>
                                        {unansweredQuestions.map(question => (
                                            <li key={question.id}>
                                                <Question id={question.id} />
                                            </li>
                                        ))}
                                    </List>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId='answered'>
                            <Row>
                                <Col>
                                    <List type='unstyled'>
                                        {answeredQuestions.map(question => (
                                            <li key={question.id}>
                                                <Question id={question.id} />
                                            </li>
                                        ))}
                                    </List>
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                </Col>
            </Row>
        </div>
    )
}

function mapStateToProps({ authedUser, questions }) {
    return {
        authedUser,
        questions: Object.values(questions).sort((a, b) => 
            b.timestamp - a.timestamp)
    }
}

export default connect(mapStateToProps)(Dashboard);
