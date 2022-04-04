import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
    Card, CardActions, CardContent, Button,
    TextField, Typography, makeStyles
} from '@material-ui/core'
import FileUpload from '@material-ui/icons/AddPhotoAlternate'
import Icon from '@material-ui/core/Icon'

import auth from './../auth/auth-helper'
import { create } from './api-product.js'

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
        fontSize: '1.2em'
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

export default function NewProduct() {
    const classes = useStyles()
    const navigate = useNavigate()
    const { shopId } = useParams()
    const [values, setValues] = useState({
        name: '', description: '', image: '',
        category: '', quantity: '', price: '',
        redirect: false, error: ''
    })
    const jwt = auth.isAuthenticated()

    const handleChange = name => event => {
        const value = name === 'image'
            ? event.target.files[0]
            : event.target.value
        setValues({ ...values, [name]: value })
    }

    const clickSubmit = () => {
        let productData = new FormData()
        values.name && productData.append('name', values.name)
        values.description && productData.append('description', values.description)
        values.image && productData.append('image', values.image)
        values.category && productData.append('category', values.category)
        values.quantity && productData.append('quantity', values.quantity)
        values.price && productData.append('price', values.price)

        create({ shopId }, { t: jwt.token }, productData).then((data) => {
            if (data.error) setValues({ ...values, error: data.error })
            else setValues({ ...values, error: '', redirect: true })
        })
    }

    useEffect(() => {
        if (values.redirect) {
            return navigate(`/seller/shop/edit/${shopId}`, { replace: true })
        }
    }, [values.redirect])

    return (<div>
        <Card className={classes.card}>
            <CardContent>
                <Typography type="headline" component="h2" className={classes.title}>
                    New Product
                </Typography><br />
                <input accept="image/*" onChange={handleChange('image')}
                    className={classes.input} id="icon-button-file" type="file" />
                <label htmlFor="icon-button-file">
                    <Button variant="contained" color="secondary" component="span">
                        Upload Photo
                        <FileUpload />
                    </Button>
                </label> <span className={classes.filename}>
                    {values.image ? values.image.name : ''}
                </span><br />
                <TextField id="name" label="Name" className={classes.textField}
                    value={values.name} onChange={handleChange('name')}
                    margin="normal" /><br />
                <TextField id="multiline-flexible" label="Description" multiline
                    rows="2" value={values.description} className={classes.textField}
                    onChange={handleChange('description')} margin="normal" /><br />
                <TextField id="category" label="Category" className={classes.textField}
                    value={values.category} onChange={handleChange('category')}
                    margin="normal" /><br />
                <TextField id="quantity" label="Quantity" className={classes.textField}
                    value={values.quantity} onChange={handleChange('quantity')}
                    type="number" margin="normal" /><br />
                <TextField id="price" label="Price" className={classes.textField}
                    value={values.price} onChange={handleChange('price')}
                    type="number" margin="normal" /><br />
                {values.error && (<Typography component="p" color="error">
                    <Icon color="error" className={classes.error}>error</Icon>
                    {values.error}</Typography>)
                }
            </CardContent>
            <CardActions>
                <Button color="primary" variant="contained" onClick={clickSubmit}
                    className={classes.submit}>Submit</Button>
                <Link to={`/seller/shop/edit/${shopId}`} className={classes.submit}>
                    <Button variant="contained">Cancel</Button></Link>
            </CardActions>
        </Card>
    </div>)
}