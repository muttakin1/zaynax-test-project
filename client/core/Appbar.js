import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import HomePage from './HomePage'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import auth from './../auth/auth-helper'
import { Link, withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Cart from './Cart'

const useStyles = makeStyles(theme =>
    ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }),
);



export default function MenuAppBar() {

    const classes = useStyles();

    const [cartBadgeIcon, setCartBadgeIcon] = useState([])
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [cartItem, setCartItem] = useState([]);
    const [showCart, setShowCart] = useState(false);

    const addToCart = (item, index) => {

        setCartBadgeIcon(cartBadgeIcon => [...cartBadgeIcon, index])
        setCartItem(cartItem => [...cartItem, item])
        console.log(cartItem);
    }
    const handleMobileMenuOpen = event => {
        setAnchorEl(event.currentTarget);
    }

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const visitCart = () => {
        setShowCart(true);
    };
     const showHome = () => {
        setShowCart(false);
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Zaynax
          </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />




                    </div>
                    <div>

                        {cartBadgeIcon.length == 0 ?
                            <IconButton color="inherit"  >
                                <ShoppingCartIcon />
                                <Typography>Cart</Typography>
                            </IconButton>
                            :

                            <IconButton onClick={visitCart} >

                                <ShoppingCartIcon />
                                <Badge badgeContent={cartBadgeIcon.length} color="secondary">
                                    <Typography>Cart</Typography>



                                </Badge>

                            </IconButton>

                        }


                        <IconButton color="inherit" onClick={handleMobileMenuOpen} >
                            <AccountCircle />
                        </IconButton>

                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            {
                                !auth.isAuthenticated() && (<span>
                                    <MenuItem>
                                        <Link to="/signup">
                                            <Button>Sign up
                                     </Button>
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link to="/signin">
                                            <Button >Sign In
                                </Button>
                                        </Link>
                                    </MenuItem>
                                </span>)
                            }
                            {

                                auth.isAuthenticated() && (<span>
                                    <MenuItem>
                                        <Link to={"/user/" + auth.isAuthenticated().user._id}>
                                            <Button >My Profile</Button>
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Button color="inherit" onClick={() => {
                                            auth.clearJWT(() => history.push('/'))
                                        }}>Sign out</Button>
                                    </MenuItem>
                                </span>)
                            }
                            <MenuItem onClick={handleClose}>Close</MenuItem>
                        </Menu>



                    </div>
                </Toolbar>
            </AppBar>

            {
                showCart == false ?
                    <HomePage addToCart={addToCart} cartBadgeIcon={cartBadgeIcon} setCartBadgeIcon={setCartBadgeIcon} />
                    :
                    <Cart item={cartItem} showHome={showHome}> </Cart>
            }



        </div>
    )
}