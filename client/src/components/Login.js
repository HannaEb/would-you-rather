import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardText,
  CardBody,
  CardImg,
  Form,
  FormGroup,
  Input,
  Button,
} from "reactstrap";
import { NavLink } from "react-router-dom";
// import { setAuthedUser } from "../actions/authedUser";
import logo from "../images/logo.png";

// new below
import { login } from "../actions/auth";
// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";

const Login = (props) => {
  // const form = useRef();
  // const checkBtn = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [toHome, setToHome] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();

    dispatch(login(username, password));
    // dispatch(setAuthedUser(selectedUser));

    // setToHome(true);
  };

  // if (toHome === true) {
  //   return <Redirect to="/" />;
  // }

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container mt-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card>
            <CardHeader className="text-center">
              <CardTitle tag="h5">Would You Rather...?</CardTitle>
              <CardText>Please sign in to continue</CardText>
            </CardHeader>
            <CardBody>
              <CardImg
                // width="80%"
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
                {message && <FormGroup>{message}</FormGroup>}
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
    </div>
  );
};

export default Login;

// const Login = () => {
//   const users = useSelector((state) => state.users);
//   const dispatch = useDispatch();
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [toHome, setToHome] = useState(false);

//   const handleChange = (event) => {
//     setSelectedUser(event.target.value);
//   };

//   const handleLogin = (event) => {
//     event.preventDefault();

//     dispatch(setAuthedUser(selectedUser));

//     setToHome(true);
//   };

//   if (toHome === true) {
//     return <Redirect to="/" />;
//   }

//   return (
//     <div className="container mt-4">
//       <Row className="justify-content-center">
//         <Col md="auto">
//           <Card>
//             <CardHeader className="text-center">
//               <CardTitle tag="h5">
//                 Welcome to the Would You Rather App!
//               </CardTitle>
//               <CardText>Please sign in to continue</CardText>
//             </CardHeader>
//             <CardBody>
//               <CardImg
//                 width="80%"
//                 className="d-block m-auto"
//                 src={logo}
//               ></CardImg>
//               <CardText className="text-center" tag="h5" color="info">
//                 Sign in
//               </CardText>
//               <Form>
//                 <FormGroup>
//                   <Input type="select" defaultValue="" onChange={handleChange}>
//                     <option value="" disabled>
//                       Select user...
//                     </option>
//                     {(Object.values(users) || []).map((user) => {
//                       return (
//                         <option value={user.id} key={user.id}>
//                           {user.name}
//                         </option>
//                       );
//                     })}
//                   </Input>
//                 </FormGroup>
//                 <Button
//                   block
//                   color="info"
//                   onClick={handleLogin}
//                   disabled={selectedUser === null}
//                 >
//                   Login
//                 </Button>
//               </Form>
//             </CardBody>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default Login;
