import mongoose from 'mongoose'

const ProductsSchema = new mongoose.Schema({
    Product_Name: {
        type: String, required: true
    },
    Product_Price: {
        type: String, required: true
    },
    discount_rate: {
        type: String, required: true
    },
    Active: {
        type: Boolean
    },
    photo: {
        data: Buffer,
        contentType: String,
    },
})

export default mongoose.model('Products', ProductsSchema)