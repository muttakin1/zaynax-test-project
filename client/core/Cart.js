import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: 30,
    }
}))

export default function Cart(props) {
    const classes = useStyles()

    console.log(props.item);

    // const goBack = () => {
    //     props.setShowcart(false)
    // }

    return (
        <div className={classes.root}>

            <Button onClick={()=>props.showHome(true)} variant="contained">Go Back</Button>

            <Grid container spacing={8}>
                <Grid item xs={6} sm={6}>

                    <Typography>Hello</Typography>

                </Grid>
            </Grid>
        </div>
    )
}