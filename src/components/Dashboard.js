import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem, NavLink, TabContent, TabPane, Row, Col, List } from 'reactstrap';
import Question from './Question';
import classnames from 'classnames';

class Dashboard extends Component {
    state = {
        activeTab: 'unanswered'
    }

    handleToggle = tab => {
        const activeTab = this.state

        if (activeTab !== tab) {
            this.setState(() => ({
                activeTab: tab
            }))
        }
    }

    render() {

        const { authedUser } = this.props
        const { activeTab } = this.state

        const unansweredQuestions = this.props.questions.filter(
            question => !question.optionOne.votes.includes(authedUser)
            && !question.optionTwo.votes.includes(authedUser))     

        const answeredQuestions = this.props.questions.filter(
                question => question.optionOne.votes.includes(authedUser) 
                || question.optionTwo.votes.includes(authedUser))
      
        return (
            <div className = 'container'>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === 'unanswered'})}
                            onClick={() => this.handleToggle('unanswered')}>
                                Unanswered Questions
                        </NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink
                            className={classnames({ active: activeTab === 'answered'})}
                            onClick={() => this.handleToggle('answered')}>
                                Answered Questions
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId='unanswered'>
                        <Row>
                            <Col sm='6'>
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
                            <Col sm='12'>
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
            </div>
        )
    }
}

function mapStateToProps({ authedUser, questions }) {
    return {
        authedUser,
        questions: Object.values(questions).sort((a, b) => 
            b.timestamp - a.timestamp)
    }
}

export default connect(mapStateToProps)(Dashboard);
