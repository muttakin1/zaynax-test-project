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
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { list } from './../core/api-order'



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
    title1: {
        flexGrow: 1,
        textAlign: 'center'
    },
    card: {
        marginTop: '20px',
        height: '80px'
    },
    confirmButton: {
        marginRight: '10px'
    }
}))

export default function Profile({ match }) {
    const classes = useStyles()
    const [orders, setOrders] = useState([])
    const [confirmedOrders, setConfirmedOrders] = useState([])

    const [pendingOrders, setPendingOrders] = useState([])
    const [cancelledOrders, setCancelledOrders] = useState([])
    const [redirectToSignin, setRedirectToSignin] = useState(false)

    const [viewPending, setViewPending] = useState(false)
    const [viewAllOrders, setViewAllOrders] = useState(true)
    const [viewConfirmedOrders, setViewConfirmedOrders] = useState(false)
    const [viewCancelledOrders, setViewCancelledOrders] = useState(false)
    const jwt = auth.isAuthenticated()

    const confirmOrder = () => {
        console.log("order confirmed");
    }
    const cancelOrder = () => {
        console.log("order cancelled");
    }
    const AllOrders = () => {
        setViewConfirmedOrders(false)
        setViewPending(false)
        setViewAllOrders(true)
        setViewCancelledOrders(false)
    }

    const ViewPendingOrdersFn = () => {
        setViewConfirmedOrders(false)
        setViewPending(true)
        setViewAllOrders(false)
        setViewCancelledOrders(false)
    }
    const ViewConfirmedOrdersFn = () => {
        
        setViewConfirmedOrders(true)
        setViewPending(false)
        setViewAllOrders(false)
        setViewCancelledOrders(false)
    }
    const ViewCancelledOrdersFn = () => {
        
        setViewConfirmedOrders(false)
        setViewPending(false)
        setViewAllOrders(false)
        setViewCancelledOrders(true)
    }

    useEffect(() => {

        const abortController = new AbortController()
        const signal = abortController.signal

        list(signal).then((data) => {
            if (data && data.error) {
                console.log(data.error);
            } else {
                console.log(data);
                setOrders(data)

                data.map((item) => {
                    if (item.status == 'Confirmed') {

                        setConfirmedOrders(confirmedOrders => [...confirmedOrders, item])
                    }
                    else if (item.status == 'Pending') {
                        setPendingOrders(pendingOrders => [...pendingOrders, item])
                    }
                    else if (item.status == 'Cancelled') {
                        setCancelledOrders(cancelledOrders => [...cancelledOrders, item])
                        
                    }
                }
                )

            }
        });

        return function cleanup() {
            abortController.abort()
        }

    }, [])

    if (redirectToSignin) {
        return <Redirect to='/signin' />
    }
    var tableRows
    if (viewAllOrders == true) {
        tableRows=orders.map((item, index) =>

            <TableBody>

                <TableRow key="name">
                    <TableCell component="th" scope="row">
                        {index + 1}
                    </TableCell>
                    <TableCell align="right">{item.orderNumber}</TableCell>
                    <TableCell align="right">{item.Price}</TableCell>
                    <TableCell align="right">
                        {item.status == 'Pending' ?
                            <>
                                <Button onClick={confirmOrder} variant="contained" className={classes.confirmButton} color="primary">Confirm</Button>
                                <Button onClick={cancelOrder} variant="contained" color="secondary">Cancel</Button>
                            </>
                            :
                            <></>
                        }
                    </TableCell>
                    <TableCell align="right">{item.status}</TableCell>
                </TableRow>

            </TableBody>

        )
    }
    else if (viewPending == true) {
        tableRows=  pendingOrders.map((item, index) =>

            <TableBody>

                <TableRow key="name">
                    <TableCell component="th" scope="row">
                        {index + 1}
                    </TableCell>
                    <TableCell align="right">{item.orderNumber}</TableCell>
                    <TableCell align="right">{item.Price}</TableCell>
                    <TableCell align="right">
                        {item.status == 'Pending' ?
                            <>
                                <Button onClick={confirmOrder} variant="contained" className={classes.confirmButton} color="primary">Confirm</Button>
                                <Button onClick={cancelOrder} variant="contained" color="secondary">Cancel</Button>
                            </>
                            :
                            <></>
                        }
                    </TableCell>
                    <TableCell align="right">{item.status}</TableCell>
                </TableRow>

            </TableBody>

        )
    }
    else if (viewConfirmedOrders == true) {
        tableRows= confirmedOrders.map((item, index) =>

            <TableBody>

                <TableRow key="name">
                    <TableCell component="th" scope="row">
                        {index + 1}
                    </TableCell>
                    <TableCell align="right">{item.orderNumber}</TableCell>
                    <TableCell align="right">{item.Price}</TableCell>
                    <TableCell align="right">
                        {item.status == 'Pending' ?
                            <>
                                <Button onClick={confirmOrder} variant="contained" className={classes.confirmButton} color="primary">Confirm</Button>
                                <Button onClick={cancelOrder} variant="contained" color="secondary">Cancel</Button>
                            </>
                            :
                            <></>
                        }
                    </TableCell>
                    <TableCell align="right">{item.status}</TableCell>
                </TableRow>

            </TableBody>

        )
    }
    else if(viewCancelledOrders == true){
        tableRows= cancelledOrders.map((item, index) =>

        <TableBody>

            <TableRow key="name">
                <TableCell component="th" scope="row">
                    {index + 1}
                </TableCell>
                <TableCell align="right">{item.orderNumber}</TableCell>
                <TableCell align="right">{item.Price}</TableCell>
                <TableCell align="right">
                    {item.status == 'Pending' ?
                        <>
                            <Button onClick={confirmOrder} variant="contained" className={classes.confirmButton} color="primary">Confirm</Button>
                            <Button onClick={cancelOrder} variant="contained" color="secondary">Cancel</Button>
                        </>
                        :
                        <></>
                    }
                </TableCell>
                <TableCell align="right">{item.status}</TableCell>
            </TableRow>

        </TableBody>

    ) 
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


                        <Button color="inherit">{auth.isAuthenticated().user.name}</Button>
                    </Toolbar>
                </AppBar>
            </div>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
                    <Paper className={classes.searchPaper}>
                        <Link to={"/user/promotions/"}>
                            <Button><Typography>Promotion</Typography></Button>
                        </Link>
                        <br></br>
                        <Link to={"/user/orders/"}>
                            <Button>
                                <Typography>Orders</Typography>
                            </Button>
                        </Link>
                        <br></br>
                        <Link to={"/user/productView/" + auth.isAuthenticated().user._id}>
                            <Button>
                                <Typography>Products</Typography>
                            </Button>
                        </Link>

                    </Paper>
                </Grid>
                <Grid item xs={12} sm={8} md={9} lg={10} xl={10}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4} md={2} lg={2} xl={2}>
                            <Card className={classes.card}>
                                <CardActionArea onClick={AllOrders}>
                                    <CardContent>
                                        <Typography className={classes.title1} color="textPrimary">
                                            All Orders
                                     </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={4} md={2} lg={2} xl={2}>
                            <Card className={classes.card}>
                                <CardActionArea onClick={ViewPendingOrdersFn}>
                                    <CardContent>
                                        <Typography className={classes.title1} color="textPrimary">
                                            Pending
                                     </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={4} md={2} lg={2} xl={2}>
                            <Card className={classes.card}>
                                <CardActionArea  onClick={ViewConfirmedOrdersFn}>
                                    <CardContent>
                                        <Typography className={classes.title1} color="textPrimary">
                                            Confirmed
                                     </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={4} md={2} lg={2} xl={2}>
                            <Card className={classes.card}>
                                <CardActionArea onClick={ViewCancelledOrdersFn}>
                                    <CardContent>
                                        <Typography className={classes.title1} color="textPrimary">
                                            Cancelled
                                     </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell >SL</TableCell>
                                            <TableCell align="right">Order No</TableCell>
                                            <TableCell align="right">Item Price</TableCell>
                                            <TableCell align="right">Action</TableCell>
                                            <TableCell align="right">Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {tableRows}


                                </Table>
                            </TableContainer>
                        </Grid>

                    </Grid>
                </Grid>

            </Grid>



        </>




    )
}