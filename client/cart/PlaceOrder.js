import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
    makeStyles, Button, Typography, Icon
} from '@material-ui/core'
import { CardElement, injectStripe } from 'react-stripe-elements'

import auth from './../auth/auth-helper'
import cart from './cart-helper.js'
import { create } from './../order/api-order.js'

const useStyles = makeStyles(theme => ({
    subheading: {
        color: 'rgba(88, 114, 128, 0.87)',
        marginTop: "20px",
    },
    checkout: { float: 'right', margin: '20px 30px' },
    error: { display: 'inline', padding: "0px 10px" },
    errorIcon: { verticalAlign: 'middle' },
    StripeElement: {
        display: 'block', margin: '24px 0 10px 10px',
        maxWidth: '408px', padding: '10px 14px',
        boxShadow: 'rgba(50, 50, 93, 0.14902) 0px 1px 3px, rgba(0, 0, 0, 0.0196078) 0px 1px 0px',
        borderRadius: '4px', background: 'white'
    }
}))

const PlaceOrder = (props) => {
    const classes = useStyles()
    const navigate = useNavigate()
    const [values, setValues] = useState({
        order: {}, error: '',
        redirect: false, orderId: ''
    })

    const placeOrder = () => {
        // eslint-disable-next-line react/prop-types
        props.stripe.createToken().then(payload => {
            if (payload.error) {
                setValues({ ...values, error: payload.error.message })
            } else {
                const jwt = auth.isAuthenticated()
                create({ userId: jwt.user._id }, { t: jwt.token },
                    props.checkoutDetails, payload.token.id)
                    .then((data) => {
                        if (data.error) {
                            setValues({ ...values, error: data.error })
                        } else {
                            cart.emptyCart(() => {
                                setValues({ ...values, 'orderId': data._id, 'redirect': true })
                            })
                        }
                    })
            }
        })
    }

    useEffect(() => {
        if (values.redirect) navigate(`/order/${values.orderId}`)
    }, [values.redirect])

    return (
        <span>
            <Typography type="subheading" component="h3"
                className={classes.subheading}>
                Card details
            </Typography>
            <CardElement className={classes.StripeElement}
                {...{
                    style: {
                        base: {
                            color: '#424770',
                            letterSpacing: '0.025em',
                            fontFamily: 'Source Code Pro, Menlo, monospace',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: { color: '#9e2146', },
                    }
                }}
            />
            <div className={classes.checkout}>
                {values.error &&
                    (<Typography component="span" color="error"
                        className={classes.error}>
                        <Icon color="error" className={classes.errorIcon}>
                            error
                        </Icon>
                        {values.error}
                    </Typography>)
                }
                <Button color="secondary" variant="contained"
                    onClick={placeOrder}>
                    Place Order
                </Button>
            </div>
        </span>)

}
PlaceOrder.propTypes = {
    checkoutDetails: PropTypes.object.isRequired
}

export default injectStripe(PlaceOrder)