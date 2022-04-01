import React, { useState } from 'react'
import {
    Card, makeStyles, TextField, Typography, Icon
} from '@material-ui/core/Card'
import { Elements } from 'react-stripe-elements'

import PlaceOrder from './PlaceOrder'
import auth from './../auth/auth-helper'
import cart from './cart-helper.js'

const useStyles = makeStyles(theme => ({
    card: {
        margin: '24px 0px',
        padding: '16px 40px 90px 40px',
        backgroundColor: '#80808017'
    },
    title: {
        margin: '24px 16px 8px 0px',
        color: theme.palette.openTitle
    },
    subheading: {
        color: 'rgba(88, 114, 128, 0.87)',
        marginTop: "20px",
    },
    addressField: {
        marginTop: "4px", width: "45%",
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    streetField: {
        marginTop: "4px", width: "93%",
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "90%"
    }
}))

export default function Checkout() {
    const classes = useStyles()
    const [values, setValues] = useState({
        checkoutDetails: {
            products: cart.getCart(),
            customer_name: user.name,
            customer_email: user.email,
            delivery_address: {
                street: '', city: '', state: '',
                zipcode: '', country: ''
            }
        },
        error: ''
    })
    const user = auth.isAuthenticated().user

    const handleCustomerChange = name => event => {
        let checkoutDetails = values.checkoutDetails
        checkoutDetails[name] = event.target.value || undefined
        setValues({ ...values, checkoutDetails: checkoutDetails })
    }

    const handleAddressChange = name => event => {
        let checkoutDetails = values.checkoutDetails
        checkoutDetails.delivery_address[name] = event.target.value || undefined
        setValues({ ...values, checkoutDetails: checkoutDetails })
    }

    return (
        <Card className={classes.card}>
            <Typography type="title" className={classes.title}>
                Checkout
            </Typography>
            <TextField id="name" label="Name" className={classes.textField}
                value={values.checkoutDetails.customer_name} margin="normal"
                onChange={handleCustomerChange('customer_name')} /><br />
            <TextField id="email" type="email" label="Email"
                className={classes.textField} margin="normal"
                value={values.checkoutDetails.customer_email}
                onChange={handleCustomerChange('customer_email')} /><br />
            <Typography type="subheading" component="h3"
                className={classes.subheading}>
                Delivery Address
            </Typography>
            <TextField id="street" label="Street Address"
                className={classes.streetField} margin="normal"
                value={values.checkoutDetails.delivery_address.street}
                onChange={handleAddressChange('street')} /><br />
            <TextField id="city" label="City" margin="normal"
                className={classes.addressField}
                value={values.checkoutDetails.delivery_address.city}
                onChange={handleAddressChange('city')} />
            <TextField id="state" label="State"
                className={classes.addressField} margin="normal"
                value={values.checkoutDetails.delivery_address.state}
                onChange={handleAddressChange('state')} /><br />
            <TextField id="zipcode" label="Zip Code"
                className={classes.addressField} margin="normal"
                value={values.checkoutDetails.delivery_address.zipcode}
                onChange={handleAddressChange('zipcode')} />
            <TextField id="country" label="Country" margin="normal"
                className={classes.addressField}
                value={values.checkoutDetails.delivery_address.country}
                onChange={handleAddressChange('country')} /><br />
            {
                values.error && (<Typography component="p" color="error">
                    <Icon color="error" className={classes.error}>error</Icon>
                    {values.error}</Typography>)
            }
            <div>
                <Elements>
                    <PlaceOrder checkoutDetails={values.checkoutDetails} />
                </Elements>
            </div>
        </Card>)
}