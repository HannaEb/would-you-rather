import React from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Col,
  Row,
} from "reactstrap";
import ScoreCard from "./ScoreCard";
import { avatars } from "../../utils/avatars.js";

const Leader = ({ leader }) => {
  const index = leader.avatar;
  const answeredQuestions = Object.keys(leader.answers).length;
  const createdQuestions = leader.questions.length;
  const score = answeredQuestions + createdQuestions;

  return (
    <Card className="mt-4">
      <CardBody>
        <Row>
          <Col sm={4}>
            <CardImg
              className="d-block m-auto card-avatar"
              src={avatars[index]}
              alt="Avatar"
            ></CardImg>
          </Col>
          <Col className="mx-auto my-4 m-sm-auto text-center">
            <CardTitle tag="h5">{leader.username}</CardTitle>
            <CardText>Answered questions: {answeredQuestions}</CardText>
            <CardText>Created questions: {createdQuestions}</CardText>
          </Col>
          <Col sm={3} className="m-sm-auto">
            <ScoreCard score={score} />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default Leader;
