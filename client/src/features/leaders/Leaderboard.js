import React from "react";
import { Row, Col, List } from "reactstrap";
import Leader from "./Leader";
import { useGetUsersQuery } from "../api/apiSlice";

const Leaderboard = () => {
  const { data: users = {} } = useGetUsersQuery();

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
              <li key={user.id}>
                <Leader leader={user} />
              </li>
            ))}
          </List>
        </Col>
      </Row>
    </div>
  );
};

export default Leaderboard;
