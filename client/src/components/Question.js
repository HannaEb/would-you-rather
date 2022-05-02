import React from "react";
import { useSelector } from "react-redux";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import { avatars } from "../utils/avatars.js";

const Question = (props) => {
  const question = useSelector((state) =>
    Object.values(state.questions).find((question) => question.id === props.id)
  );
  const users = useSelector((state) => state.users);
  const index = users[question.author].avatar;
  const { id, author, optionOne, optionTwo } = question;

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
          <Col sm={6} className="mx-auto my-4 m-sm-auto text-center">
            <CardTitle tag="h5">Would you rather...</CardTitle>
            <CardText>...{optionOne.text.substring(0, 20)}...</CardText>
            <CardText>...{optionTwo.text.substring(0, 20)}...</CardText>
            <Link to={`/questions/${id}`}>
              <Button outline color="secondary">
                View Details
              </Button>
            </Link>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default Question;
