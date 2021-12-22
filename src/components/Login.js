import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';

class Login extends Component {
    state = {
        authedUser: ''
    }

    handleChange = event => {
        this.setState(() => ({
            authedUser: event.target.value
        }))
    }

    handleLogin = event => {
        event.preventDefault()
        const { dispatch } = this.props
        const { authedUser } = this.state

        dispatch(setAuthedUser(authedUser))
    }

    render() {
        const { users } = this.props
        return (
            <div>
                <select onChange={this.handleChange}>
                    <option  value="select" >Select user...</option>
                    {(Object.values(users) || []).map((user) => {
                        return (
                            <option value={user.id} key={user.id}>{ user.name }</option>
                        )
                    })}
                </select>
                <button onClick={this.handleLogin}>Login</button>
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
