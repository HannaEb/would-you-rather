import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { NavLink } from "react-router-dom";
import logo from "../images/logo.png";
import { login } from "../actions/auth";
import { receiveUsers } from "../actions/users";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(receiveUsers());
  }, [dispatch]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();

    dispatch(login(username, password));
  };

  if (isLoggedIn) {
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
              <Form>
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
                    block
                    color="info"
                    onClick={handleLogin}
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
                  <NavLink className="nav-link text-secondary" to="register">
                    Or Register Here
                  </NavLink>
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
