import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleInitialData } from "../actions/shared";
import LoadingBar from "react-redux-loading";
import Login from "./Login";
import Navigation from "./Navigation";
import Dashboard from "./Dashboard";
import AddQuestion from "./AddQuestion";
import Leaderboard from "./Leaderboard";
import QuestionPage from "./QuestionPage";
import Error from "./Error";

const App = () => {
  const authedUser = useSelector((state) => state.authedUser);
  const loading = useSelector((state) => Object.keys(state.users).length === 0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);

  return (
    <Router>
      <Fragment>
        <LoadingBar style={{ backgroundColor: "#5BC0DE" }} />
        {loading === true ? null : (
          <div>
            {authedUser !== null && <Navigation />}
            <Switch>
              {authedUser === null && <Route component={Login} />}
              <Route path="/" exact component={Dashboard} />
              <Route path="/add" component={AddQuestion} />
              <Route path="/leaderboard" component={Leaderboard} />
              <Route path="/questions/:id" component={QuestionPage} />
              <Route Path="*" component={Error} />
            </Switch>
          </div>
        )}
      </Fragment>
    </Router>
  );
};

export default App;
