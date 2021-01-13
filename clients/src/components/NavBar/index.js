import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

const NavBar = ({ isLoggedIn, logout }) => {
    return (
        <nav>
            { !isLoggedIn ?
                <>
                {/* <NavLink exact to='/'>Home</NavLink>
                <NavLink exact to='/login'>Login</NavLink>
                <NavLink exact to='/register'>Register</NavLink> */}
                </>
                :
                <>
                <NavLink to='/habits'>Habits</NavLink>
                <NavLink to='/addhabit'>Add Habit</NavLink>
                <NavLink to='/statistics'>Statistics</NavLink>
                <button id="logoutbtn" onClick={logout}>Logout</button>
                </>
            }
        </nav>
    );
}

export default withRouter(NavBar);