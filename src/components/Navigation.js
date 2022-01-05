import React from 'react';
import { Nav, Navbar, NavItem, NavbarBrand, NavbarText } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetAuthedUser } from '../actions/authedUser';

const Navigation = props => {

    const { authedUser, avatar, dispatch } = props

    return (
        <div>
            <Navbar color='light' light expand='md'>
                <div className='container'>
                    <Nav navbar>
                        <NavItem>
                            <NavLink className="nav-link" to='/' exact>
                                Home
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className='nav-link' to='/add'>
                                Add Question
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className='nav-link' to='/leaderboard'>
                                Leaderboard
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <NavbarBrand className='ml-auto'>
                        <img src={avatar} alt='Avatar' width='50'></img>
                    </NavbarBrand>
                    <Nav className='ml' navbar>
                        <NavbarText>
                            Hello, {authedUser}!   
                        </NavbarText>
                        <NavItem>
                            <NavLink className='nav-link' to='/' onClick={() => dispatch(resetAuthedUser())}>
                                Logout
                            </NavLink>
                        </NavItem>
                    </Nav>
                </div>
            </Navbar> 
        </div>
    )
}

function mapStateToProps({ authedUser, users }){
    const avatar = users[authedUser].avatarURL

    return {
        authedUser,
        avatar
    }
}

export default connect(mapStateToProps)(Navigation);
