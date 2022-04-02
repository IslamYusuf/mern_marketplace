import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    makeStyles, Paper, List, ListItem, ListItemText,
    Typography, Divider
} from '@material-ui/core'

import auth from './../auth/auth-helper'
import { listByUser } from './api-order.js'

const useStyles = makeStyles(theme => ({
    root: theme.mixins.gutters({
        maxWidth: 600, margin: '12px 24px',
        padding: theme.spacing(3),
        backgroundColor: '#3f3f3f0d'
    }),
    title: {
        margin: `${theme.spacing(2)}px 0 12px ${theme.spacing(1)}px`,
        color: theme.palette.openTitle
    }
}))

export default function MyOrders() {
    const classes = useStyles()
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const jwt = auth.isAuthenticated()
        const abortController = new AbortController()
        const signal = abortController.signal

        listByUser({ userId: jwt.user._id }, { t: jwt.token })
            .then((data) => {
                if (data.error) console.log(data.error)
                else setOrders(data)
            })
        return function cleanup() {
            abortController.abort()
        }
    }, [])

    return (
        <Paper className={classes.root} elevation={4}>
            <Typography type="title" className={classes.title}>
                Your Orders
            </Typography>
            <List dense>
                {orders.map((order, i) => {
                    return <span key={i}>
                        <Link to={"/order/" + order._id}>
                            <ListItem button>
                                <ListItemText
                                    primary={<strong>{"Order # " + order._id}</strong>}
                                    secondary={(new Date(order.created)).toDateString()} />
                            </ListItem>
                        </Link>
                        <Divider />
                    </span>
                })}
            </List>
        </Paper>
    )
}