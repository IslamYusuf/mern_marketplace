import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
    makeStyles, Typography, ImageList,
    ImageListItem, ImageListItemBar,
} from '@material-ui/core'

import AddToCart from '../cart/AddToCart'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex', flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden', padding: '0 8px',
        background: theme.palette.background.paper,
        textAlign: 'left',
    },
    container: { minWidth: '100%', paddingBottom: '14px' },
    gridList: {
        width: '100%', minHeight: 200,
        padding: '16px 0 10px'
    },
    title: {
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
        color: theme.palette.openTitle,
        width: '100%'
    },
    tile: { textAlign: 'center' },
    image: { height: '100%' },
    tileBar: {
        backgroundColor: 'rgba(0, 0, 0, 0.72)',
        textAlign: 'left'
    },
    tileTitle: {
        fontSize: '1.1em', marginBottom: '5px',
        color: 'rgb(189, 222, 219)', display: 'block'
    }
}))

export default function Products(props) {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            {props.products.length > 0 ?
                (<div className={classes.container}>
                    <ImageList cellHeight={200} className={classes.gridList} cols={3}>
                        {props.products.map((product, i) => (
                            <ImageListItem key={i} className={classes.tile}>
                                <Link to={`/product/${product._id}`}>
                                    <img className={classes.image} alt={product.name}
                                        src={`/api/product/image/${product._id}`} />
                                </Link>
                                <ImageListItemBar className={classes.tileBar} title={
                                    <Link to={`/product/${product._id}`}
                                        className={classes.tileTitle}>
                                        {product.name}
                                    </Link>}
                                    subtitle={<span>$ {product.price}</span>}
                                    actionIcon={<AddToCart item={product} />}
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>) : props.searched && (
                    <Typography variant="subheading" component="h4"
                        className={classes.title}>
                        No products found!
                    </Typography>)
            }
        </div>)
}
Products.propTypes = {
    products: PropTypes.array.isRequired,
    searched: PropTypes.bool.isRequired
}