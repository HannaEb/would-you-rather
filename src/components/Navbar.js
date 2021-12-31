import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetAuthedUser } from '../actions/authedUser';

class Navbar extends Component {
    render() {

        const { authedUser, avatar } = this.props
    
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
                        <NavLink to='/' onClick={() => this.props.dispatch(resetAuthedUser())}>
                            Logout
                        </NavLink>
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
