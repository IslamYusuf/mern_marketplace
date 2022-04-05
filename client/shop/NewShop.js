import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    Card, CardActions, CardContent, Button,
    TextField, Typography, Icon, makeStyles,
} from '@material-ui/core'
import FileUpload from '@material-ui/icons/AddPhotoAlternate'

import auth from './../auth/auth-helper'
import { create } from './api-shop.js'

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600, margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing(5),
        paddingBottom: theme.spacing(2)
    },
    error: { verticalAlign: 'middle' },
    title: {
        marginTop: theme.spacing(2),
        color: theme.palette.openTitle,
        fontSize: '1em'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300
    },
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing(2)
    },
    input: { display: 'none' },
    filename: { marginLeft: '10px' }
}))

export default function NewShop() {
    const classes = useStyles()
    const navigate = useNavigate()
    const [values, setValues] = useState({
        name: '', description: '',
        image: '', redirect: false, error: ''
    })
    const jwt = auth.isAuthenticated()

    const handleChange = name => event => {
        const value = name === 'image'
            ? event.target.files[0]
            : event.target.value
        setValues({ ...values, [name]: value })
    }
    const clickSubmit = () => {
        let shopData = new FormData()
        values.name && shopData.append('name', values.name)
        values.description && shopData.append('description', values.description)
        values.image && shopData.append('image', values.image)

        create({ userId: jwt.user._id }, { t: jwt.token }, shopData)
            .then((data) => {
                if (data.error) setValues({ ...values, error: data.error })
                else setValues({ ...values, error: '', redirect: true })
            })
    }

    useEffect(() => {
        if (values.redirect) {
            return navigate('/seller/shops', { replace: true })
        }
    }, [values.redirect])

    return (<div>
        <Card className={classes.card}>
            <CardContent>
                <Typography type="headline" component="h2" className={classes.title}>
                    New Shop
                </Typography>
                <br />
                <input accept="image/*" onChange={handleChange('image')}
                    className={classes.input} id="icon-button-file" type="file" />
                <label htmlFor="icon-button-file">
                    <Button variant="contained" color="secondary" component="span">
                        Upload Logo
                        <FileUpload />
                    </Button>
                </label> <span className={classes.filename}>
                    {values.image ? values.image.name : ''}
                </span><br />
                <TextField id="name" label="Name" margin="normal"
                    value={values.name} className={classes.textField}
                    onChange={handleChange('name')} /><br />
                <TextField id="multiline-flexible" label="Description"
                    multiline rows="2" value={values.description}
                    onChange={handleChange('description')}
                    className={classes.textField} margin="normal" /><br />
                {values.error && (<Typography component="p" color="error">
                    <Icon color="error" className={classes.error}>error</Icon>
                    {values.error}</Typography>)
                }
            </CardContent>
            <CardActions>
                <Button color="primary" variant="contained" onClick={clickSubmit}
                    className={classes.submit}>Submit</Button>
                <Link to='/seller/shops' className={classes.submit}>
                    <Button variant="contained">Cancel</Button></Link>
            </CardActions>
        </Card>
    </div>)
}