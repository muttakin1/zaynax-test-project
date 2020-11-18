import mongoose from 'mongoose'

const ProductsSchema = new mongoose.Schema({
    Product_Name: {
        type: String, required: true
    },
    Product_Price: {
        type: Number, required: true
    },
    discount_rate: {
        type: Number, required: true
    },
    Active: {
        type: Boolean, 
    },
    shipping_Charge: {
        type: Number, required: true
    },
    Color: {
        type: String,
    },
    Size: {
        type: String,
    },
    photo: {
        data: Buffer,
        contentType: String,
    },
})

export default mongoose.model('Products', ProductsSchema)