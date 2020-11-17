import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { list } from './api-home'
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles({
    root: {
        padding:'40px'
    },
    media: {
        height: 140,
    },
    card: {
        maxHeight: "200px",
    },
});

export default function HomePage(props) {
    const classes = useStyles();

    const [products, setProducts] = useState([])
    const [style, setStyle] = useState({display: 'none'});
    

    const abortController = new AbortController()
    const signal = abortController.signal

    useEffect(() => {

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

    }, [])

    const mouseEnter= ()=>{
        setStyle({display: 'block',  margin: 'auto', width: '50%'});
    }
    const mouseLeave= ()=>{
        setStyle({display: 'none'})
    }
   
    return (
        <Grid className={classes.root} container spacing={2}>
            {
                products.map((item, index) => (
                    <Grid className={classes.card} item xl={2} lg={2}>
                    <Card key={index}>
                        <CardActionArea onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
                            <CardMedia
                                className={classes.media}
                                image="/static/images/cards/contemplative-reptile.jpg"
                                title="Contemplative Reptile"
                            /> 
                            <Button onClick={()=>props.addToCart(index)} style={style} >Add to Cart</Button>
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
                                <Grid item xl={2}  lg={2}>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {item.discount_rate}
                                </Typography>
                                </Grid>
                                </Grid>
                            </CardContent>
                        </CardActionArea>

                    </Card>
                    </Grid >
                ))
            }
       </Grid >

    );
}