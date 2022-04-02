import React from 'react'
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
    AppBar, Button, IconButton,
    Toolbar, Typography, Badge
} from '@material-ui/core'
import { Home } from '@material-ui/icons'
import CartIcon from '@material-ui/icons/ShoppingCart'

import cart from './../cart/cart-helper'
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

    const isPartActive = (location, path) => {
        if (location.pathname.includes(path))
            return { color: '#bef67a' }
        else
            return { color: '#ffffff' }
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" color="inherit">
                    MERN Marketplace
                </Typography>
                <div>
                    <Link to="/">
                        <IconButton aria-label="Home"
                            style={isActive(location, "/")}>
                            <Home />
                        </IconButton>
                    </Link>
                    <Link to="/shops/all">
                        <Button style={isActive(location, "/shops/all")}>
                            All Shops
                        </Button>
                    </Link>
                    <Link to="/cart">
                        <Button style={isActive(location, "/cart")}>
                            Cart
                            <Badge color="secondary" invisible={false}
                                badgeContent={cart.itemTotal()}
                                style={{ 'marginLeft': '7px' }}>
                                <CartIcon />
                            </Badge>
                        </Button>
                    </Link>
                </div>
                <div style={{ 'position': 'absolute', 'right': '10px' }}>
                    <span style={{ 'float': 'right' }}>
                        {!auth.isAuthenticated() && (
                            <span>
                                <Link to="/signup">
                                    <Button style={isActive(location, "/signup")}>
                                        Sign Up
                                    </Button>
                                </Link>
                                <Link to="/signin">
                                    <Button style={isActive(location, "/signin")}>
                                        Sign In
                                    </Button>
                                </Link>
                            </span>
                        )}
                        {auth.isAuthenticated() && (
                            <span>
                                {auth.isAuthenticated().user.seller &&
                                    (<Link to="/seller/shops">
                                        <Button style={isPartActive(history, "/seller/")}>
                                            My Shops
                                        </Button>
                                    </Link>)}
                                <Link to={`/user/${auth.isAuthenticated().user._id}`}>
                                    <Button style={
                                        isActive(location, `/user/${auth.isAuthenticated().user._id}`)
                                    }>
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