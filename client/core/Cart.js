import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import { Button, Divider } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import { list } from './api-Products'
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: 30,
    },
    media: {
        height: 200,
        maxWidth: "200px",
    },
    card: {
        marginBottom: 30,
        maxHeight: "400px",
    },
}))

export default function Cart(props) {
    const classes = useStyles()


    const [cartProducts, setCartProducts] = useState(props.item)
    const [checked, setChecked] = React.useState(true);
    const [subtotal, setSubtotal] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [shipping, setShipping] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)

    const deleteProduct = (index) => {
        const tempProducts = [...cartProducts];


        tempProducts.splice(index, 1);


        setCartProducts(tempProducts)


    }
    const handleChange = (event) => {
        setChecked(event.target.checked);
        console.log(event.target.checked);
    };
    const checkout = () => {
        if (checked == false) {
            alert("You must agree to the terms and conditions, Privacy Policy and Refund Policy")
        }
        else{
            alert("Your order has been placed")
        }
    };


    useEffect(() => {
        let subTotalCalculator = 0;
        let discountCalculator = 0;
        let shippingCalculator = 0;

        cartProducts.map((item, index) => {

            subTotalCalculator = subTotalCalculator + parseInt(item.Product_Price.toString())
            discountCalculator = discountCalculator + parseInt(item.discount_rate.toString())
            shippingCalculator = shippingCalculator + item.shipping_Charge

        })

        setSubtotal(subTotalCalculator)
        
        discountCalculator=(discountCalculator/100)*subTotalCalculator
      
        setDiscount(discountCalculator)
        setShipping(shippingCalculator)

        setTotalPrice(subTotalCalculator+shippingCalculator-discountCalculator)

    }, [])






    return (
        <div className={classes.root}>

            <Button onClick={() => props.showHome(true)} variant="contained" style={{ marginBottom: 30 }}>Go Back</Button>

            <br></br>

            <Grid container spacing={2}>
                <Grid item xl={9} lg={9} >

                    {cartProducts.map((item, index) => (

                        <Card className={classes.card}  >

                            <Grid container spacing={4} >

                                <Grid item xl={2} lg={2} >
                                    <CardMedia
                                        className={classes.media}
                                        image={'/api/products/photo/' + item._id}
                                    />
                                </Grid>
                                <Grid item item xl={9} lg={9} >
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {item.Product_Name}
                                        </Typography>

                                        <Grid item xl={9} lg={9} >
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                Product Price: {item.Product_Price}
                                            </Typography>
                                        </Grid>
                                        <Grid item xl={2} lg={2}>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {item.discount_rate}
                                            </Typography>
                                        </Grid>

                                    </CardContent>

                                </Grid>
                                <Grid item>
                                    <IconButton onClick={() => deleteProduct(index)}>
                                        <DeleteIcon> </DeleteIcon>
                                    </IconButton>
                                </Grid>
                            </Grid>


                        </Card>

                    ))}
                    <Grid container spacing ={1}>
                        <Grid item >
                            <Checkbox
                                checked={checked}
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        </Grid>
                        <Grid item xl={8}>
                            
                            <Typography style={{paddingTop:'10px'}}>I agree to the terms and conditions, Privacy Policy and Refund Policy</Typography>
                        </Grid>
                        <Grid item>
                            <Button onClick={checkout} variant="contained" color="primary"> Checkout </Button>

                        </Grid>
                    </Grid>

                
                </Grid>

                <Grid item xl={3} lg={3}>
                    <Card>
                        <Typography gutterBottom variant="h5">
                            Order Summary
                        </Typography>
                        <Divider></Divider>
                        <Typography variant="h6" color="TextPrimary" component="p">
                            Subtotal: {subtotal}
                        </Typography>
                        <Typography variant="h6" color="TextPrimary" component="p">
                            Discount: {discount}
                        </Typography>
                        <Typography variant="h6" color="TextPrimary" component="p">
                            Shipping charge: {shipping}
                        </Typography>
                        <Divider></Divider>
                        <TextField
                            label="Type your Code"
                            variant="outlined"
                        />
                        <Button variant="contained">
                            Apply
                        </Button>
                        <Divider></Divider>
                        <Typography variant="h6" color="TextPrimary" component="p">
                            Total Payable: {totalPrice}
                        </Typography>
                    </Card>
                </Grid>
            </Grid>


        </div>
    )
}