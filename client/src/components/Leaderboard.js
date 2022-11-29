import React from "react";
import { useSelector } from "react-redux";
import { Row, Col, List, Container } from "reactstrap";
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
    <Container>
      <Row className="justify-content-center">
        <Col md={10} xl={8}>
          <List type="unstyled">
            {sortedUsers.map((user) => (
              <li key={user.id}>
                <Leader id={user.id} />
              </li>
            ))}
          </List>
        </Col>
      </Row>
    </Container>
  );
};

export default Leaderboard;
