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
import { list, create } from '../core/api-Products'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import TextField from '@material-ui/core/TextField'

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
    root1:{
        height:"500px"
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
    newButton: {
        margin: theme.spacing(2)
    },
    submit: {
        margin: theme.spacing(2)
    },
    textField: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        width: '90%'
    },
    input: {
        display: 'none',
    },
}))

export default function Profile({ match }) {
    const classes = useStyles()

    const [user, setUser] = useState({})
    const [redirectToSignin, setRedirectToSignin] = useState(false)
    const [products, setProducts] = useState([])
    const [values, setValues] = useState({
        Product_Name: '',
        Product_Price: '',
        discount_rate: '',
        photo: '',
        error: '',
        user: {}
    })

    const jwt = auth.isAuthenticated()

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        setValues({ ...values, user: auth.isAuthenticated().user })

        // read({
        //     userId: match.params.userId
        // }, { t: jwt.token }, signal).then((data) => {
        //     if (data && data.error) {
        //         setRedirectToSignin(true)
        //     } else {
        //         setUser(data)
        //     }
        // })

        // list(signal).then((data) => {
        //     if (data && data.error) {
        //         console.log(data.error)
        //     } else {
        //         console.log(data);
        //         setProducts(data)
        //     }
        // })
        // return function cleanup() {
        //     abortController.abort()
        // }

    }, [])

    if (redirectToSignin) {
        return <Redirect to={'/user/productView/' + auth.isAuthenticated().user._id} />
    }
    const handleChange = name => event => {
        const value = name === 'photo'
            ? event.target.files[0]
            : event.target.value
        setValues({ ...values, [name]: value })
    }

    const clickSubmit = () => {

        let productData = new FormData()

        productData.append('Product_Name', values.Product_Name)
        productData.append('Product_Price', values.Product_Price)
        productData.append('discount_rate', values.discount_rate)
        productData.append('photo', values.photo)


        create({
            userId: jwt.user._id
        },
            {
                t: jwt.token,
            },
            productData,
        ).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error })
                console.log(data.error)

            } else {
                setValues({ ...values, error: '', redirect: true })

            }
        })
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
                        <Button><Typography>Hello</Typography></Button>
                        <br></br>
                        <Button><Typography>Orders</Typography></Button>
                        <br></br>
                        <Link to={"/user/productView/" + auth.isAuthenticated().user._id}>
                            <Typography>Products</Typography>
                        </Link>
                    </Paper>
                </Grid>
                <Grid item xs={10} sm={10} md={9} lg={10} xl={10}>
                    <Paper className={classes.root1}>
                        <input accept="image/*" onChange={handleChange('photo')} className={classes.input} id="icon-button-file" type="file" />
                        <label htmlFor="icon-button-file">
                            <IconButton color="secondary" className={classes.photoButton} component="span">
                                <PhotoCamera />
                            </IconButton>
                        </label> <span className={classes.filename}>{values.photo ? values.photo.name : ''}</span>
                        {values.error && (<Typography component="p" color="error">
                            <Icon color="error" className={classes.error}>error</Icon>
                            {values.error}
                        </Typography>)
                        }<br></br>
                       
                    
                        <TextField

                            value={values.text}
                            onChange={handleChange('Product_Name')}
                            className={classes.textField}
                            
                            label="Product Name"
                            variant="outlined"
                            margin="normal"
                        />
                        <TextField

                            value={values.text}
                            onChange={handleChange('Product_Price')}
                            className={classes.textField}
                           
                            label="Product Price (Before Discount)"
                            variant="outlined"
                            margin="normal"
                        />
                        <TextField

                            value={values.text}
                            onChange={handleChange('discount_rate')}
                            className={classes.textField}
                            
                            label="Discount rate"
                            variant="outlined"
                            margin="normal"
                        />


                        <Button
                            color="primary"
                            variant="contained"
                            onClick={clickSubmit}
                            className={classes.submit}
                        >
                            Submit
                </Button>
                    </Paper>
                </Grid>


            </Grid>

        </>




    )
}