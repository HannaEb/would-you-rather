import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Col,
  List,
} from "reactstrap";
import Question from "./Question";
import classnames from "classnames";
import { useGetQuestionsQuery } from "../features/api/apiSlice";

const Dashboard = () => {
  const authedUser = useSelector((state) => state.auth.user);
  const [activeTab, setActiveTab] = useState("unanswered");
  const { data: questions = {} } = useGetQuestionsQuery();

  const sortedQuestions = useMemo(() => {
    const sortedQuestions = Object.values(questions).sort(
      (a, b) => b.timestamp - a.timestamp
    );
    return sortedQuestions;
  }, [questions]);

  const unansweredQuestions = sortedQuestions.filter(
    (question) =>
      !question.optionOne.votes.includes(authedUser.id) &&
      !question.optionTwo.votes.includes(authedUser.id)
  );

  const answeredQuestions = sortedQuestions.filter(
    (question) =>
      question.optionOne.votes.includes(authedUser.id) ||
      question.optionTwo.votes.includes(authedUser.id)
  );

  const handleToggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Nav fill tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "unanswered" })}
                onClick={() => handleToggle("unanswered")}
              >
                Unanswered Questions
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "answered" })}
                onClick={() => handleToggle("answered")}
              >
                Answered Questions
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="unanswered">
              <Row>
                <Col>
                  <List type="unstyled">
                    {unansweredQuestions.map((question) => (
                      <li key={question.id}>
                        <Question question={question} />
                      </li>
                    ))}
                  </List>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="answered">
              <Row>
                <Col>
                  <List type="unstyled">
                    {answeredQuestions.map((question) => (
                      <li key={question.id}>
                        <Question question={question} />
                      </li>
                    ))}
                  </List>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
