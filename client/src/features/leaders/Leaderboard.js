import React from "react";
import { Container, Row, Col, List } from "reactstrap";
import Leader from "./Leader";
import Loader from "../../components/Loader";
import { useGetUsersQuery } from "../api/apiSlice";

const Leaderboard = () => {
  const { data: users = {}, isLoading, isSuccess } = useGetUsersQuery();

  const sortedUsers = Object.values(users)
    .map((user) => ({
      score:
        Object.keys(user.answers).length + Object.keys(user.questions).length,
      ...user,
    }))
    .sort((a, b) => b.score - a.score);

  let content;

  if (isLoading) {
    content = <Loader />;
  } else if (isSuccess) {
    content = (
      <Container>
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
      </Container>
    );
  }

  return <div>{content}</div>;
};

export default Leaderboard;
