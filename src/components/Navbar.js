import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { resetAuthedUser } from '../actions/authedUser';

class Navbar extends Component {
    state = {
        toHome: false
    }

    handleLogout = () => {
        const { dispatch } = this.props

        dispatch(resetAuthedUser())

        this.setState({
            toHome: true
        })
    } 

    render() {

        const { authedUser, avatar } = this.props
        const { toHome } = this.state

        if (toHome === true) {
            return <Redirect to='/' />
        }

        return (
            <nav>
                <ul>
                    <li>
                        <NavLink to='/' exact activeClassName='active'>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/add' activeClassName='active'>
                            Add Question
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/leaderboard' activeClassName='active'>
                            Leaderboard
                        </NavLink>
                    </li>
                    <li>
                        <p>Hello, {authedUser}!</p>
                        <img src={avatar} alt='Avatar' width='50'></img>
                    </li>
                    <li>
                        <button onClick={this.handleLogout}>
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>
        )
    }
}

function mapStateToProps({ authedUser, users }){
    const avatar = users[authedUser].avatarURL

    return {
        authedUser,
        avatar
    }
}

export default connect(mapStateToProps)(Navbar);
