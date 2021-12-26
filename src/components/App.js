import React, { Component, Fragment }  from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import Login from './Login';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import AddQuestion from './AddQuestion';
import Leaderboard from './Leaderboard';

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        return (
            <Router>
                <Fragment>
                    {this.props.authedUser !== '' && <Navbar />}
                    <Switch>
                      {this.props.authedUser === '' && <Route component={Login} />}
                      <Route path='/' exact component={Dashboard} />
                      <Route path='/add' component={AddQuestion} />
                      <Route path='/leaderboard' component={Leaderboard} />
                    </Switch>  
                </Fragment>  
            </Router>
            
        )
    }
}

function mapStateToProps({ authedUser }) {
    return {
      authedUser
    }
  }

export default connect(mapStateToProps)(App);
