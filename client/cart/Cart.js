import React, { useState } from 'react'
import { StripeProvider } from 'react-stripe-elements'
import { Grid, makeStyles } from '@material-ui/core'

import CartItems from './CartItems'
import config from './../../config/config'
import Checkout from './Checkout'

const useStyles = makeStyles(() => ({
    root: { flexGrow: 1, margin: 30, }
}))

export default function Cart() {
    const classes = useStyles()
    const [checkout, setCheckout] = useState(false)

    const showCheckout = val => {
        setCheckout(val)
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={8}>
                <Grid item xs={6} sm={6}>
                    <CartItems checkout={checkout}
                        setCheckout={showCheckout} />
                </Grid>
                {checkout &&
                    <Grid item xs={6} sm={6}>
                        <StripeProvider apiKey={config.stripe_test_api_key}>
                            <Checkout />
                        </StripeProvider>
                    </Grid>}
            </Grid>
        </div>
    )
}