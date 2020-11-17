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
    height:'-webkit-fill-available'
    // marginRight: theme.spacing(1),
  },
}))

export default function Profile({ match }) {
  const classes = useStyles()
  const [user, setUser] = useState({})
  const [redirectToSignin, setRedirectToSignin] = useState(false)
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

    return function cleanup() {
      abortController.abort()
    }

  }, [match.params.userId])

  if (redirectToSignin) {
    return <Redirect to='/signin' />
  }
  return (
    <>

      
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
            <Paper className={classes.searchPaper}>
              <Button><Typography>Promotion</Typography></Button>
              <br></br>
              <Button><Typography>Orders</Typography></Button>
              <br></br>
              <Button><Typography>Products</Typography></Button>
            </Paper>
          </Grid></Grid>
      

    </>




  )
}