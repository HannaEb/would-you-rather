import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import QuestionDetails from "./QuestionDetails";
import QuestionResults from "./QuestionResults";
import Error from "./Error";
import { useGetQuestionsQuery } from "../features/api/apiSlice";

const QuestionPage = (props) => {
  const { id } = props.match.params;
  const userId = useSelector((state) => state.auth.user.id);
  const { question } = useGetQuestionsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      question: data[id],
    }),
  });

  const answered =
    question &&
    (question.optionOne.votes.includes(userId) ||
      question.optionTwo.votes.includes(userId))
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
