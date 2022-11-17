import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardBody,
  CardImg,
  Form,
  FormGroup,
  Input,
  Button,
  Alert,
} from "reactstrap";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import { useLoginUserMutation } from "../api/apiSlice";
import { selectAuthedUser } from "../auth/authSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const authedUser = useSelector(selectAuthedUser);
  const { message } = useSelector((state) => state.message);

  const [loginUser] = useLoginUserMutation();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await loginUser({ username, password }).unwrap();
      setUsername("");
      setPassword("");
    } catch (err) {
      console.error("Failed to login: ", err);
    }
  };

  if (authedUser) {
    return <Redirect to="/" />;
  }

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card>
            <CardHeader className="text-center">
              <CardTitle tag="h3">Would You Rather...?</CardTitle>
              <CardSubtitle>Please sign in to continue</CardSubtitle>
            </CardHeader>
            <CardBody>
              <CardImg
                className="d-block mx-auto my-4 logo"
                src={logo}
              ></CardImg>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Input
                    type="text"
                    name="username"
                    value={username}
                    placeholder="Username"
                    onChange={handleUsernameChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={handlePasswordChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Button
                    type="submit"
                    block
                    color="info"
                    disabled={username === "" || password === ""}
                  >
                    Login
                  </Button>
                </FormGroup>
                {message && (
                  <FormGroup className="text-center">
                    <Alert color="danger">{message}</Alert>
                  </FormGroup>
                )}
                <FormGroup className="text-center">
                  <Link className="nav-link text-secondary" to="register">
                    Or Register Here
                  </Link>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
