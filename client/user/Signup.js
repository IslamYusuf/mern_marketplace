import React, { useState } from 'react'
import { Link } from "react-router-dom"
import {
    Button, Card, CardActions, CardContent,
    Icon, TextField, Typography, makeStyles, Dialog,
    DialogTitle, DialogContent, DialogContentText, DialogActions
} from "@material-ui/core"

import { create } from './api-user'

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600, margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing(12),
        paddingBottom: theme.spacing(2)
    },
    error: { verticalAlign: 'middle' },
    title: {
        marginTop: theme.spacing(2),
        color: theme.palette.openTitle
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300
    },
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing(2)
    }
}))

export default function Signup() {
    const classes = useStyles()
    const [user, setUser] = useState({
        name: '', password: '',
        email: '', open: false,
        error: ''
    })

    const handleChange = name => event => {
        setUser({ ...user, [name]: event.target.value })
    }

    const clickSubmit = () => {
        const updatedUser = {
            name: user.name || undefined,
            email: user.email || undefined,
            password: user.password || undefined
        }
        create(updatedUser).then((data) => {
            if (data.error) {
                setUser({ ...user, error: data.error })
            } else {
                setUser({ ...user, error: '', open: true })
            }
        })
    }

    const handleOnClose = (event, reason) => {
        //Disabling bakdropClick in the Dialog
        if (reason !== 'backdropClick') {
            setUser({ ...user, open: false })
        }
    }

    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6" className={classes.title}>
                        Sign Up
                    </Typography>
                    <TextField id="name" label="Name"
                        className={classes.textField}
                        value={user.name} onChange={handleChange('name')}
                        margin="normal" />
                    <br />
                    <TextField id="email" type="email" label="Email"
                        className={classes.textField}
                        value={user.email} onChange={handleChange('email')}
                        margin="normal" />
                    <br />
                    <TextField id="password" type="password" label="Password"
                        className={classes.textField} value={user.password}
                        onChange={handleChange('password')} margin="normal" />
                    <br />
                    {
                        user.error && (
                            <Typography component="p" color="error">
                                <Icon color="error" className={classes.error}>Error: </Icon>
                                {user.error}</Typography>
                        )
                    }
                </CardContent>
                <CardActions>
                    <Button color="primary" variant="contained" onClick={clickSubmit}
                        className={classes.submit}>Submit</Button>
                </CardActions>
            </Card>
            <Dialog open={user.open} onClose={handleOnClose}>
                <DialogTitle>New Account</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        New account successfully created.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Link to="/signin">
                        <Button color="primary" autoFocus="autoFocus"
                            variant="contained">
                            Sign In
                        </Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </div>
    )
}