import React from "react";
import { Card, CardHeader, CardBody, Badge } from "reactstrap";

const ScoreCard = (props) => {
  const { score } = props;

  return (
    <Card>
      <CardHeader className="text-center">Score</CardHeader>
      <CardBody className="text-center">
        <Badge className="score-badge" color="info" pill>
          {score}
        </Badge>
      </CardBody>
    </Card>
  );
};

export default ScoreCard;
