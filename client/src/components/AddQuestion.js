import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  FormText,
  Input,
  Button,
} from "reactstrap";

import { createQuestion } from "../actions/questions";

const AddQuestion = () => {
  const dispatch = useDispatch();
  const [optionOneText, setOptionOneText] = useState("");
  const [optionTwoText, setOptionTwoText] = useState("");
  const [toHome, setToHome] = useState(false);

  const handleOptionOneChange = (event) => {
    setOptionOneText(event.target.value);
  };

  const handleOptionTwoChange = (event) => {
    setOptionTwoText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(createQuestion(optionOneText, optionTwoText));

    setOptionOneText("");
    setOptionTwoText("");
    setToHome(true);
  };

  if (toHome === true) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <Row className="justify-content-center">
        <Col md="auto">
          <Card>
            <CardHeader tag="h3">Create New Question</CardHeader>
            <CardBody>
              <CardTitle tag="h5">Would you rather...</CardTitle>
              <Form>
                <FormGroup>
                  <Input
                    type="text"
                    value={optionOneText}
                    onChange={handleOptionOneChange}
                    maxLength={100}
                  />
                </FormGroup>
                <FormText tag="p" className="text-center">
                  or
                </FormText>
                <FormGroup>
                  <Input
                    type="text"
                    value={optionTwoText}
                    onChange={handleOptionTwoChange}
                    maxLength={100}
                  />
                </FormGroup>
                <Button
                  block
                  color="info"
                  onClick={handleSubmit}
                  disabled={optionOneText === "" || optionTwoText === ""}
                >
                  Add
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AddQuestion;
