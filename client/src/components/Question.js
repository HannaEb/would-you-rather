import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardFooter,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import { avatars } from "../utils/avatars.js";
import { deleteQuestion } from "../actions/questions";

const Question = (props) => {
  const question = useSelector((state) =>
    Object.values(state.questions).find((question) => question.id === props.id)
  );
  const { id, author, optionOne, optionTwo } = question;
  const authedUser = useSelector((state) => state.auth.user.user);
  const isAdmin = authedUser.role === "admin";
  const dispatch = useDispatch();

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardText>{author.username} asks:</CardText>
      </CardHeader>
      <CardBody>
        <Row>
          <Col sm={6}>
            <CardImg
              className="d-block m-auto card-avatar"
              src={avatars[author.avatar]}
              height="200"
              width="200"
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
      {isAdmin && (
        <CardFooter className="text-center">
          <Button
            className="delete-button"
            color="link"
            size="sm"
            onClick={() => dispatch(deleteQuestion(id))}
          >
            Delete Question
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default Question;
