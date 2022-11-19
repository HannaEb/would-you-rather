import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Nav,
  Navbar,
  NavItem,
  NavbarBrand,
  NavbarText,
} from "reactstrap";
import { avatars } from "../utils/avatars.js";
import { selectAuthedUser, logout } from "../features/auth/authSlice";

const Navigation = () => {
  const authedUser = useSelector(selectAuthedUser);
  const index = authedUser.avatar;
  const dispatch = useDispatch();

  return (
    <Navbar color="light" light expand="md">
      <Container>
        <Nav navbar>
          <NavItem>
            <NavLink className="nav-link" to="/" exact>
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" to="/questions/add">
              Add Question
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" to="/leaderboard">
              Leaderboard
            </NavLink>
          </NavItem>
        </Nav>
        <NavbarBrand className="ml-auto">
          <img src={avatars[index]} alt="Avatar" width="50"></img>
        </NavbarBrand>
        <Nav navbar>
          <NavbarText>Hello, {authedUser.username}!</NavbarText>
          <NavItem>
            <NavLink
              className="nav-link"
              to="/"
              onClick={() => dispatch(logout())}
            >
              Logout
            </NavLink>
          </NavItem>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;
