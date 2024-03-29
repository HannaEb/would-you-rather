import React from "react";
import { useSelector } from "react-redux";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
  Progress,
  Badge,
} from "reactstrap";
import { calculatePercentage } from "../utils/helpers";
import { avatars } from "../utils/avatars";

const QuestionResults = (props) => {
  const authedUser = useSelector((state) => state.auth.user.user);
  const question = useSelector((state) => state.questions[props.id]);
  const { author, optionOne, optionTwo } = question;
  const optionOneVotes = optionOne.votes.length;
  const optionTwoVotes = optionTwo.votes.length;
  const totalVotes = optionOneVotes + optionTwoVotes;
  const optionOnePerc = calculatePercentage(optionOneVotes, totalVotes);
  const optionTwoPerc = calculatePercentage(optionTwoVotes, totalVotes);
  const optionOneChoice = optionOne.votes.includes(authedUser.id);
  const optionTwoChoice = optionTwo.votes.includes(authedUser.id);

  return (
    <Card className="mt-4">
      <CardHeader>Asked by {author.username}</CardHeader>
      <CardBody>
        <Row>
          <Col className="m-auto">
            <CardImg
              className="d-block m-auto card-avatar"
              src={avatars[author.avatar]}
              height="200"
              width="200"
              alt="Avatar"
            ></CardImg>
          </Col>
          <Col sm={8}>
            <CardTitle tag="h5">Results:</CardTitle>
            <Card className="mb-3" color="light">
              {optionOneChoice && <Badge color="info">Your choice</Badge>}
              <CardBody>
                <CardText>
                  Would rather {optionOne.text.toLowerCase()}:
                </CardText>
                <Progress className="mb-3" value={optionOnePerc} color="info">
                  {optionOnePerc}%
                </Progress>
                <CardText>
                  {optionOneVotes} out of {totalVotes} votes
                </CardText>
              </CardBody>
            </Card>
            <Card color="light">
              {optionTwoChoice && <Badge color="info">Your choice</Badge>}
              <CardBody>
                <CardText>
                  Would rather {optionTwo.text.toLowerCase()}:
                </CardText>
                <Progress className="mb-3" value={optionTwoPerc} color="info">
                  {optionTwoPerc}%
                </Progress>
                <CardText>
                  {optionTwoVotes} out of {totalVotes} votes
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default QuestionResults;
