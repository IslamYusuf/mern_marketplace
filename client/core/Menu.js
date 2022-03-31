import React from 'react'
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
    AppBar, Button, IconButton,
    Toolbar, Typography
} from '@material-ui/core'
import { Home } from '@material-ui/icons'

import auth from './../auth/auth-helper'

const Menu = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (location, path) => {
        if (location.pathname == path)
            return { color: '#ff4081' }
        else
            return { color: '#ffffff' }
    }

    return (
        <AppBar position="fixed" style={{ zIndex: 12343455 }}>
            <Toolbar>
                <Typography variant="h6" color="inherit">
                    MERN Skeleton
                </Typography>
                <div>
                    <Link to="/">
                        <IconButton aria-label="Home" style={isActive(location, "/")}>
                            <Home />
                        </IconButton>
                    </Link>
                </div>
                <Link to="/users">
                    <Button style={isActive(location, "/users")}>Users</Button>
                </Link>
                <div style={{ 'position': 'absolute', 'right': '10px' }}>
                    <span style={{ 'float': 'right' }}>
                        {!auth.isAuthenticated() && (
                            <span>
                                <Link to="/signup">
                                    <Button style={isActive(location, "/signup")}> Sign Up </Button>
                                </Link>
                                <Link to="/signin">
                                    <Button style={isActive(location, "/signin")}> Sign In </Button>
                                </Link>
                            </span>
                        )}
                        {auth.isAuthenticated() && (
                            <span>
                                <Link to={`/user/${auth.isAuthenticated().user._id}`}>
                                    <Button style={isActive(location, `/user/${auth.isAuthenticated().user._id}`)}>
                                        My Profile
                                    </Button>
                                </Link>
                                <Button color="inherit"
                                    onClick={() => { auth.clearJWT(() => navigate('/')) }}>
                                    Sign out
                                </Button>
                            </span>
                        )}
                    </span>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Menu