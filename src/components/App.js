import React, { Component, Fragment }  from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import LoadingBar from 'react-redux-loading';
import Login from './Login';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import AddQuestion from './AddQuestion';
import Leaderboard from './Leaderboard';
import QuestionPage from './QuestionPage';
import Error from './Error';


class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        return (
            <Router>
                <Fragment>
                    <LoadingBar />
                    {this.props.loading === true
                        ? null
                        : <div>
                        {this.props.authedUser !== null && <Navbar />}
                        <Switch>
                          {this.props.authedUser === null && <Route component={Login} />}
                          <Route path='/' exact component={Dashboard} />
                          <Route path='/add' component={AddQuestion} />
                          <Route path='/leaderboard' component={Leaderboard} />
                          <Route path='/questions/:id' component={QuestionPage} />
                          <Route Path='*' component={Error} />
                        </Switch>  
                        </div>
                        }
                    
                </Fragment>  
            </Router>
            
        )
    }
}

function mapStateToProps({ authedUser, users }) {
    return {
      authedUser,
      loading: Object.keys(users).length === 0
    }
  }

export default connect(mapStateToProps)(App);
