import Product from '../models/product.model'
import extend from 'lodash/extend'
import errorHandler from './../helpers/dbErrorHandler'
import mongoose from 'mongoose'

const create = async (req, res) => {
  try {
    // req.body.recorded_by = req.auth._id
    const product = new Product(req.body)
    await product.save()
    return res.status(200).json({
      message: "Product saved!"
    })
  } catch (err) {
      console.log(err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}



const read = async (req, res) => {
    try {
        let products = await Product.find()
        res.json(products)
      } catch (error) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(error),
        })
      }
}




export default {
    create,
   
    read,
    
}