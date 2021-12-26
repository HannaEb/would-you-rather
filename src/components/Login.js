import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setAuthedUser } from '../actions/authedUser';

class Login extends Component {
    state = {
        authedUser: '',
        toHome: false
    }

    handleChange = event => {
        this.setState(() => ({
            authedUser: event.target.value,
        }))
    }

    handleLogin = event => {
        event.preventDefault()
        const { dispatch } = this.props
        const { authedUser } = this.state

        dispatch(setAuthedUser(authedUser))

        this.setState(() => ({
            toHome: true
        }))  
    }

    render() {
        const { users } = this.props
        const { toHome, authedUser } = this.state

        if (toHome === true) {
            return <Redirect to='/' />
        }

        return (
            <div>
                <select onChange={this.handleChange}>
                    <option  value="select">Select user...</option>
                    {(Object.values(users) || []).map((user) => {
                        return (
                            <option value={user.id} key={user.id}>{ user.name }</option>
                        )
                    })}
                </select>
                <button onClick={this.handleLogin} disabled={authedUser === ''}>Login</button>
            </div>
        )
    }
}

function mapStateToProps({ users }) {
    return {
      users
    };
  }

export default connect(mapStateToProps)(Login);
