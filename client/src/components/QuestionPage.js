import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import QuestionDetails from "./QuestionDetails";
import QuestionResults from "./QuestionResults";
import Error from "./Error";

const QuestionPage = (props) => {
  const { id } = props.match.params;
  const userId = useSelector((state) => state.auth.user.user.id);
  const question = useSelector((state) => state.questions[id]);

  const answered =
    question &&
    (question.optionOne.votes.includes(userId) ||
      question.optionTwo.votes.includes(userId))
      ? true
      : false;

  const invalid = !question ? true : false;

  if (invalid) {
    return <Error />;
  } else {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={7}>
            {answered === false ? (
              <QuestionDetails id={id} />
            ) : (
              <QuestionResults id={id} />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
};

export default QuestionPage;
