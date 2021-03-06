import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardImg,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { updateQuestion } from "../actions/questions";
import { avatars } from "../utils/avatars.js";

const QuestionDetails = (props) => {
  const question = useSelector((state) => state.questions[props.id]);
  const users = useSelector((state) => state.users);
  const index = users[question.author].avatar;
  const authedUser = useSelector((state) => state.auth.user.id);
  const [answer, setAnswer] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { id } = props;

    dispatch(updateQuestion(id, { id, authedUser, answer, question }));
  };

  const { author, optionOne, optionTwo } = question;

  return (
    <Card className="mt-4">
      <CardHeader>{author} asks:</CardHeader>
      <CardBody>
        <Row>
          <Col sm={6}>
            <CardImg
              className="d-block m-auto card-avatar"
              src={avatars[index]}
              alt="Avatar"
            ></CardImg>
          </Col>
          <Col sm={6} className="mx-auto my-4 m-sm-auto">
            <CardTitle tag="h5">Would you rather...</CardTitle>
            <Form>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="optionOne"
                    value="optionOne"
                    checked={answer === "optionOne"}
                    onChange={handleChange}
                  />
                  {optionOne.text}
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="optionTwo"
                    value="optionTwo"
                    checked={answer === "optionTwo"}
                    onChange={handleChange}
                  />
                  {optionTwo.text}
                </Label>
              </FormGroup>
              <Button
                className="mt-3"
                color="info"
                onClick={handleSubmit}
                disabled={answer === null}
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default QuestionDetails;
