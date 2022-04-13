import React from "react";
import { useSelector } from "react-redux";
import {
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

const QuestionResults = (props) => {
  const question = useSelector((state) => state.questions[props.id]);
  const users = useSelector((state) => state.users);
  const authedUser = useSelector((state) => state.authedUser);

  const avatar = users[question.author].avatarURL;
  const { author, optionOne, optionTwo } = question;
  const optionOneVotes = optionOne.votes.length;
  const optionTwoVotes = optionTwo.votes.length;
  const totalVotes = optionOneVotes + optionTwoVotes;
  const optionOnePerc = calculatePercentage(optionOneVotes, totalVotes);
  const optionTwoPerc = calculatePercentage(optionTwoVotes, totalVotes);
  const optionOneChoice = optionOne.votes.includes(authedUser);
  const optionTwoChoice = optionTwo.votes.includes(authedUser);

  return (
    <Card className="mt-4">
      <CardHeader>Asked by {author}</CardHeader>
      <CardBody>
        <div className="row">
          <div className="col my-auto">
            <CardImg
              width="100%"
              className="d-block m-auto card-avatar"
              src={avatar}
              alt="Avatar"
            ></CardImg>
          </div>
          <div className="col sm-8">
            <CardTitle tag="h5">Results:</CardTitle>
            <Card className="mb-3" color="light">
              {optionOneChoice && <Badge color="info">Your choice</Badge>}
              <CardBody>
                <CardText>Would you rather {optionOne.text}?</CardText>
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
                <CardText>Would you rather {optionTwo.text}?</CardText>
                <Progress className="mb-3" value={optionTwoPerc} color="info">
                  {optionTwoPerc}%
                </Progress>
                <CardText>
                  {optionTwoVotes} out of {totalVotes} votes
                </CardText>
              </CardBody>
            </Card>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default QuestionResults;
