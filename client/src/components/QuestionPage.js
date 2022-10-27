import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import QuestionDetails from "./QuestionDetails";
import QuestionResults from "./QuestionResults";
import Error from "./Error";

const QuestionPage = (props) => {
  const userId = useSelector((state) => state.auth.user.id);
  const user = useSelector((state) => state.users[userId]);
  const questions = useSelector((state) => state.questions);
  const { id } = props.match.params;
  const answered = user.answers.some((answer) => answer.id === id);

  let invalid;

  if (questions[id] === undefined) {
    invalid = true;
  } else {
    invalid = false;
  }

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
