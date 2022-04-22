import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleInitialData } from "./actions/shared";
import { receiveQuestions } from "./actions/questions";
import LoadingBar from "react-redux-loading";
import Login from "./components/Login";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import AddQuestion from "./components/AddQuestion";
import Leaderboard from "./components/Leaderboard";
import QuestionPage from "./components/QuestionPage";
import Error from "./components/Error";

const App = () => {
  const authedUser = useSelector((state) => state.authedUser);
  const loading = useSelector((state) => Object.keys(state.users).length === 0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(receiveQuestions());
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
              <Route exact path={["/", "/questions"]} component={Dashboard} />
              <Route exact path="/add" component={AddQuestion} />
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
