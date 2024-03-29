import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import logo from "../images/logo.png";
import avatar0 from "../images/avatar0.png";
import avatar1 from "../images/avatar1.png";
import avatar2 from "../images/avatar2.png";
import avatar3 from "../images/avatar3.png";
import avatar4 from "../images/avatar4.png";
import avatar5 from "../images/avatar5.png";
import avatar6 from "../images/avatar6.png";
import avatar7 from "../images/avatar7.png";
import avatar8 from "../images/avatar8.png";
import avatar9 from "../images/avatar9.png";
import avatar10 from "../images/avatar10.png";
import avatar11 from "../images/avatar11.png";

import { register } from "../actions/auth";
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
  FormText,
  Input,
  Button,
  Label,
  Alert,
} from "reactstrap";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [toHome, setToHome] = useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleAvatarChange = (event) => {
    setAvatar(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(register(username, avatar, password)).then(() => {
      setToHome(true);
    });
  };

  if (toHome === true) {
    return <Redirect to="/" />;
  }

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card>
            <CardHeader className="text-center">
              <CardTitle tag="h3">Would You Rather...?</CardTitle>
              <CardSubtitle>Please sign up to continue</CardSubtitle>
            </CardHeader>
            <CardBody>
              <CardImg
                className="d-block mx-auto my-4 logo"
                src={logo}
                width="400"
                height="600"
                alt="Question mark"
              ></CardImg>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Input
                    type="text"
                    maxLength={15}
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
                <FormGroup className="text-center">
                  <FormText>Select Avatar</FormText>
                </FormGroup>
                <FormGroup check className="mb-3 text-center">
                  <Row>
                    <Col xs={4} className="mb-2">
                      <Label check>
                        <Input
                          type="radio"
                          name="avatar0"
                          value="0"
                          checked={avatar === "0"}
                          onChange={handleAvatarChange}
                        />
                        <CardImg
                          className="d-block m-auto signup-avatar"
                          src={avatar0}
                          height="100"
                          width="100"
                          alt="Female, long blond hair"
                        />
                      </Label>
                    </Col>
                    <Col xs={4} className="mb-2">
                      <Label check>
                        <Input
                          type="radio"
                          name="avatar1"
                          value="1"
                          checked={avatar === "1"}
                          onChange={handleAvatarChange}
                        />
                        <CardImg
                          className="d-block m-auto signup-avatar"
                          src={avatar1}
                          height="100"
                          width="100"
                          alt="Male, bold, with beard"
                        />
                      </Label>
                    </Col>
                    <Col xs={4} className="mb-2">
                      <Label check>
                        <Input
                          type="radio"
                          name="avatar2"
                          value="2"
                          checked={avatar === "2"}
                          onChange={handleAvatarChange}
                        />
                        <CardImg
                          className="d-block m-auto signup-avatar"
                          src={avatar2}
                          height="100"
                          width="100"
                          alt="Male, short black hair"
                        />
                      </Label>
                    </Col>
                    <Col xs={4} className="mb-2">
                      <Label check>
                        <Input
                          type="radio"
                          name="Avatar3"
                          value="3"
                          checked={avatar === "3"}
                          onChange={handleAvatarChange}
                        />
                        <CardImg
                          className="d-block m-auto signup-avatar"
                          src={avatar3}
                          height="100"
                          width="100"
                          alt="Female, long black hair"
                        />
                      </Label>
                    </Col>
                    <Col xs={4} className="mb-2">
                      <Label check>
                        <Input
                          type="radio"
                          name="avatar4"
                          value="4"
                          checked={avatar === "4"}
                          onChange={handleAvatarChange}
                        />
                        <CardImg
                          className="d-block m-auto signup-avatar"
                          src={avatar4}
                          height="100"
                          width="100"
                          alt="Female, black hair, double top knots"
                        />
                      </Label>
                    </Col>
                    <Col xs={4} className="mb-2">
                      <Label check>
                        <Input
                          type="radio"
                          name="avatar5"
                          value="5"
                          checked={avatar === "5"}
                          onChange={handleAvatarChange}
                        />
                        <CardImg
                          className="d-block m-auto signup-avatar"
                          src={avatar5}
                          height="100"
                          width="100"
                          alt="Male, dark hair, goatee, glasses"
                        />
                      </Label>
                    </Col>
                    <Col xs={4} className="mb-2">
                      <Label check>
                        <Input
                          type="radio"
                          name="avatar6"
                          value="6"
                          checked={avatar === "6"}
                          onChange={handleAvatarChange}
                        />
                        <CardImg
                          className="d-block m-auto signup-avatar"
                          src={avatar6}
                          height="100"
                          width="100"
                          alt="Female, short blond hair, glasses"
                        />
                      </Label>
                    </Col>
                    <Col xs={4} className="mb-2">
                      <Label check>
                        <Input
                          type="radio"
                          name="avatar7"
                          value="7"
                          checked={avatar === "7"}
                          onChange={handleAvatarChange}
                        />
                        <CardImg
                          className="d-block m-auto signup-avatar"
                          src={avatar7}
                          height="100"
                          width="100"
                          alt="Male, light brown hair, goatee"
                        />
                      </Label>
                    </Col>
                    <Col xs={4} className="mb-2">
                      <Label check>
                        <Input
                          type="radio"
                          name="avatar8"
                          value="8"
                          checked={avatar === "8"}
                          onChange={handleAvatarChange}
                        />
                        <CardImg
                          className="d-block m-auto signup-avatar"
                          src={avatar8}
                          height="100"
                          width="100"
                          alt="Female, long red hair, ponytail"
                        />
                      </Label>
                    </Col>
                    <Col xs={4} className="mb-2">
                      <Label check>
                        <Input
                          type="radio"
                          name="avatar9"
                          value="9"
                          checked={avatar === "9"}
                          onChange={handleAvatarChange}
                        />
                        <CardImg
                          className="d-block m-auto signup-avatar"
                          src={avatar9}
                          height="100"
                          width="100"
                          alt="Female, long brown hair, pigtails, sunglasses"
                        />
                      </Label>
                    </Col>
                    <Col xs={4} className="mb-2">
                      <Label check>
                        <Input
                          type="radio"
                          name="avatar10"
                          value="10"
                          checked={avatar === "10"}
                          onChange={handleAvatarChange}
                        />
                        <CardImg
                          className="d-block m-auto signup-avatar"
                          src={avatar10}
                          height="100"
                          width="100"
                          alt="Male, brown hair, goatee"
                        />
                      </Label>
                    </Col>
                    <Col xs={4} className="mb-2">
                      <Label check>
                        <Input
                          type="radio"
                          name="avatar11"
                          value="11"
                          checked={avatar === "11"}
                          onChange={handleAvatarChange}
                        />
                        <CardImg
                          className="d-block m-auto signup-avatar"
                          src={avatar11}
                          height="100"
                          width="100"
                          alt="Female, black hair, glasses"
                        />
                      </Label>
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Button
                    type="submit"
                    block
                    color="info"
                    disabled={
                      username === "" || password === "" || avatar === ""
                    }
                  >
                    Sign Up
                  </Button>
                </FormGroup>
                {message && (
                  <FormGroup className="text-center">
                    <Alert color="danger">{message}</Alert>
                  </FormGroup>
                )}
                <FormGroup className="text-center">
                  <Link className="nav-link text-secondary" to="/">
                    Or Sign In Here
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

export default Register;
