import React from "react";
import { useSelector } from "react-redux";
import { Card, CardImg, CardBody, CardTitle, CardText } from "reactstrap";
import ScoreCard from "./ScoreCard";

const Leader = (props) => {
  const leader = useSelector((state) => state.users[props.id]);

  const avatar = leader.avatarURL;
  const answeredQuestions = Object.keys(leader.answers).length;
  const createdQuestions = leader.questions.length;
  const score = answeredQuestions + createdQuestions;

  return (
    <Card className="mt-4">
      <CardBody>
        <div className="row h-100">
          <div className="col-4">
            <CardImg
              width="100%"
              className="d-block m-auto card-avatar"
              src={avatar}
              alt="Avatar"
            ></CardImg>
          </div>
          <div className="col-auto">
            <CardTitle tag="h5">{leader.name}</CardTitle>
            <CardText>Answered questions: {answeredQuestions}</CardText>
            <CardText>Created questions: {createdQuestions}</CardText>
          </div>
          <div className="col-3 m-auto">
            <ScoreCard score={score} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default Leader;
