import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import Register from "./components/Register";
import Login from "./components/Login";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import AddQuestion from "./components/AddQuestion";
import Leaderboard from "./components/Leaderboard";
import QuestionPage from "./components/QuestionPage";
import Error from "./components/Error";
import LoadingBar from "react-redux-loading-bar";

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <Router>
      <>
        <LoadingBar style={{ backgroundColor: "#5BC0DE" }} />
        <>
          {!isLoggedIn ? (
            <>
              <Switch>
                <Route exact path={["/", "/login"]} component={Login} />
                <Route path="/register" component={Register} />
              </Switch>
            </>
          ) : (
            <>
              {isLoggedIn && <Navigation />}
              <Switch>
                <Route exact path={["/", "/questions"]} component={Dashboard} />
                <Route exact path="/questions/add" component={AddQuestion} />
                <Route exact path="/leaderboard" component={Leaderboard} />
                <Route path="/questions/:id" component={QuestionPage} />
                <Route path="*" component={Error} />
              </Switch>
            </>
          )}
        </>
      </>
    </Router>
  );
};

export default App;
