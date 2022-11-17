import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  FormText,
  Input,
  Button,
} from "reactstrap";
import { useAddQuestionMutation } from "../features/api/apiSlice";
import { selectAuthedUserId } from "../features/auth/authSlice";

const AddQuestion = () => {
  const [optionOneText, setOptionOneText] = useState("");
  const [optionTwoText, setOptionTwoText] = useState("");
  const [toHome, setToHome] = useState(false);
  const authedUserId = useSelector(selectAuthedUserId);

  const [addQuestion] = useAddQuestionMutation();

  const handleOptionOneChange = (event) => {
    setOptionOneText(event.target.value.toLowerCase());
  };

  const handleOptionTwoChange = (event) => {
    setOptionTwoText(event.target.value.toLowerCase());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await addQuestion({
        authorId: authedUserId,
        optionOneText,
        optionTwoText,
      }).unwrap();
      setOptionOneText("");
      setOptionTwoText("");
      setToHome(true);
    } catch (err) {
      console.error("Failed to save question: ", err);
    }
  };

  if (toHome === true) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="text-center">
            <CardHeader>
              <CardText tag="h4">Create New Question</CardText>
            </CardHeader>
            <CardBody>
              <CardTitle tag="h5">Would you rather...</CardTitle>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Input
                    type="text"
                    value={optionOneText}
                    onChange={handleOptionOneChange}
                    maxLength={30}
                  />
                </FormGroup>
                <FormText tag="p">or</FormText>
                <FormGroup>
                  <Input
                    type="text"
                    value={optionTwoText}
                    onChange={handleOptionTwoChange}
                    maxLength={30}
                  />
                </FormGroup>
                <FormGroup>
                  <Button
                    type="submit"
                    block
                    color="info"
                    disabled={optionOneText === "" || optionTwoText === ""}
                  >
                    Add
                  </Button>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddQuestion;
