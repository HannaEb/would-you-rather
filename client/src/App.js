import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Register from "./features/auth/Register";
import Login from "./features/auth/Login";
import Navigation from "./app/Navigation";
import Dashboard from "./features/questions/Dashboard";
import AddQuestion from "./features/questions/AddQuestion";
import Leaderboard from "./features/leaders/Leaderboard";
import QuestionPage from "./features/questions/QuestionPage";
import Error from "./components/Error";
import { selectAuthedUser } from "./features/auth/authSlice";

const App = () => {
  const authedUser = useSelector(selectAuthedUser);
  return (
    <Router>
      <Fragment>
        <div>
          {!authedUser ? (
            <div>
              <Switch>
                <Route exact path={["/", "/login"]} component={Login} />
                <Route path="/register" component={Register} />
                <Redirect to="/" component={Login} />
              </Switch>
            </div>
          ) : (
            <div>
              {authedUser && <Navigation />}
              <Switch>
                <Route exact path={["/", "/questions"]} component={Dashboard} />
                <Route exact path="/questions/add" component={AddQuestion} />
                <Route exact path="/leaderboard" component={Leaderboard} />
                <Route path="/questions/:id" component={QuestionPage} />
                <Route path="*" component={Error} />
              </Switch>
            </div>
          )}
        </div>
      </Fragment>
    </Router>
  );
};

export default App;
