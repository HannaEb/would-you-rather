import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import Register from "./features/auth/Register";
import Login from "./features/auth/Login";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import AddQuestion from "./components/AddQuestion";
import Leaderboard from "./components/Leaderboard";
import QuestionPage from "./components/QuestionPage";
import Error from "./components/Error";
import LoadingBar from "react-redux-loading-bar";
import { selectAuthedUser } from "./features/auth/authSlice";

const App = () => {
  const authedUser = useSelector(selectAuthedUser);
  return (
    <Router>
      <Fragment>
        <LoadingBar style={{ backgroundColor: "#5BC0DE" }} />
        <div>
          {!authedUser ? (
            <div>
              <Switch>
                <Route exact path={["/", "/login"]} component={Login} />
                <Route path="/register" component={Register} />
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
