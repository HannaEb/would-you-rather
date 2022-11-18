import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import QuestionDetails from "./QuestionDetails";
import QuestionResults from "./QuestionResults";
import Error from "../../components/Error";
import { useGetQuestionsQuery } from "../api/apiSlice";
import { selectAuthedUserId } from "../auth/authSlice";

const QuestionPage = (props) => {
  const { id } = props.match.params;
  const { question } = useGetQuestionsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      question: data[id],
    }),
  });
  const authedUserId = useSelector(selectAuthedUserId);

  const answered =
    question &&
    (question.optionOne.votes.includes(authedUserId) ||
      question.optionTwo.votes.includes(authedUserId))
      ? true
      : false;

  const invalid = !question ? true : false;

  let content;

  if (invalid) {
    content = <Error />;
  } else {
    content = (
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={7}>
            {answered === false ? (
              <QuestionDetails question={question} />
            ) : (
              <QuestionResults question={question} />
            )}
          </Col>
        </Row>
      </Container>
    );
  }

  return <div>{content}</div>;
};

export default QuestionPage;
