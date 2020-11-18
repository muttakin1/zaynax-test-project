import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Edit from '@material-ui/icons/Edit'
import Person from '@material-ui/icons/Person'
import Divider from '@material-ui/core/Divider'
import DeleteUser from './DeleteUser'
import auth from './../auth/auth-helper'
import { read } from './api-user.js'
import { Redirect, Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import HomeIcon from '@material-ui/icons/Home';
import { list } from '../core/api-Products'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    paper: {
        flexGrow: 1,
        // margin: '20px',
    },
    title: {
        marginTop: theme.spacing(3),
        color: theme.palette.protectedTitle
    },
    searchPaper: {
        padding: theme.spacing(2),
        // textAlign: 'center',
        color: theme.palette.text.primary,
        marginLeft: theme.spacing(1),
        height: '-webkit-fill-available'
        // marginRight: theme.spacing(1),
    },
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    media: {
        height: 140,
    },
    newButton:{
        margin: theme.spacing(2)
    }
}))

export default function Profile({ match }) {
    const classes = useStyles()

    const [user, setUser] = useState({})
    const [redirectToSignin, setRedirectToSignin] = useState(false)
    const [products, setProducts] = useState([])

    const jwt = auth.isAuthenticated()

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        read({
            userId: match.params.userId
        }, { t: jwt.token }, signal).then((data) => {
            if (data && data.error) {
                setRedirectToSignin(true)
            } else {
                setUser(data)
            }
        })

        list(signal).then((data) => {
            if (data && data.error) {
                console.log(data.error)
            } else {
                console.log(data);
                setProducts(data)
            }
        })
        return function cleanup() {
            abortController.abort()
        }

    }, [match.params.userId])

    if (redirectToSignin) {
        return <Redirect to='/signin' />
    }
    
    return (
        <>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Link to="/">
                            <IconButton edge="start" className={classes.menuButton} style={{ color: "white" }} aria-label="menu">
                                <HomeIcon />
                            </IconButton>
                        </Link>

                        <Typography variant="h6" className={classes.title}>
                            Zaynax
          </Typography>


                        <Typography>{auth.isAuthenticated().user.name}</Typography>
                    </Toolbar>
                </AppBar>
            </div>

            <Grid container spacing={3}>


                <Grid item xs={2} sm={2} md={3} lg={2} xl={2}>
                    <Paper className={classes.searchPaper}>
                        <Button><Typography>Promotion</Typography></Button>
                        <br></br>
                        <Button><Typography>Orders</Typography></Button>
                        <br></br>
                        <Link to={"/user/productView/" + auth.isAuthenticated().user._id}>
                            <Typography>Products</Typography>
                        </Link>
                    </Paper>
                </Grid>
                <Grid item xs={10} sm={10} md={9} lg={10} xl={10}>
                    <Paper>

                        <Link to={"/user/productForm/"}>
                            <Button className={classes.newButton} variant="contained" color="secondary ">
                                Add New Product
                            </Button>
                        </Link>
                        {
                            products.map((item, index) => (
                               
                                <Grid item xs={12} sm={4} md={2} lg={2} xl={2}>
                                    <Card className={classes.root}>
                                        <CardActionArea>
                                            <CardMedia
                                                className={classes.media}
                                                image={`/api/products/photo/${item._id}?${new Date().getTime()}`}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {item.Product_Name}
                                                </Typography>
                                                <Grid container spacing={4} >
                                                    <Grid item xl={9} lg={9} >
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            {item.Product_Price}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xl={2} lg={2}>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            {item.discount_rate}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>

                                            </CardContent>
                                        </CardActionArea>

                                    </Card>
                                </Grid>
                            ))
                        }
                    </Paper>
                </Grid>


            </Grid>

        </>




    )
}