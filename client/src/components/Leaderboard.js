import React from "react";
import { useSelector } from "react-redux";
import { Row, Col, List } from "reactstrap";
import Leader from "./Leader";

const Leaderboard = () => {
  const users = useSelector((state) => state.users);

  const sortedUsers = Object.values(users)
    .map((user) => ({
      score:
        Object.keys(user.answers).length + Object.keys(user.questions).length,
      ...user,
    }))
    .sort((a, b) => b.score - a.score);

  return (
    <div className="container">
      <Row className="justify-content-center">
        <Col md={10} xl={8}>
          <List type="unstyled">
            {sortedUsers.map((user) => (
              <li key={user.username}>
                <Leader id={user.username} />
              </li>
            ))}
          </List>
        </Col>
      </Row>
    </div>
  );
};

export default Leaderboard;
