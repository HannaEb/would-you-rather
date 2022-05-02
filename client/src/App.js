import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { handleInitialData } from "./actions/shared";
import { receiveQuestions } from "./actions/questions";
import { receiveUsers } from "./actions/users";
import LoadingBar from "react-redux-loading";
import Register from "./components/Register";
import Login from "./components/Login";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import AddQuestion from "./components/AddQuestion";
import Leaderboard from "./components/Leaderboard";
import QuestionPage from "./components/QuestionPage";
import Error from "./components/Error";

const App = () => {
  // const authedUser = useSelector((state) => state.authedUser);
  const authedUser = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const loading = useSelector((state) => Object.keys(state.users).length === 0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(receiveQuestions());
    dispatch(receiveUsers());
    // dispatch(handleInitialData());
  }, [dispatch]);

  return (
    <Router>
      <Fragment>
        <LoadingBar style={{ backgroundColor: "#5BC0DE" }} />
        {loading === true ? null : (
          <div>
            {!isLoggedIn ? (
              <div>
                <Switch>
                  <Route exact path={["/", "/login"]} component={Login} />
                  <Route path="/register" component={Register} />
                </Switch>
              </div>
            ) : (
              <div>
                {isLoggedIn && <Navigation />}
                <Switch>
                  <Route
                    exact
                    path={["/", "/questions"]}
                    component={Dashboard}
                  />
                  <Route exact path="/add" component={AddQuestion} />
                  <Route path="/leaderboard" component={Leaderboard} />
                  <Route path="/questions/:id" component={QuestionPage} />
                  <Route Path="*" component={Error} />
                </Switch>
              </div>
            )}
          </div>
        )}
      </Fragment>
    </Router>
  );
};

export default App;
