import Product from '../models/product.model'
import extend from 'lodash/extend'
import errorHandler from './../helpers/dbErrorHandler'
import mongoose from 'mongoose'
import formidable from 'formidable'
import fs from 'fs'

const create = async (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded',
      })
    }
    let product = new Product(fields)
    //console.log(fields)
    // product.Product_Name= JSON.parse(fields.Product_Name)
    // product.Product_Price= JSON.parse(fields.Product_Price)
    // product.discount_rate= JSON.parse(fields.discount_rate)
  

    if (files.photo) {
      product.photo.data = fs.readFileSync(files.photo.path)
      product.photo.contentType = files.photo.type
    }
    try {
      await product.save()
      return res.status(200).json({
        message: 'Product recorded!',
      })
    } catch (err) {
      console.log(err);
      return res.status(400).json({
       
        error: errorHandler.getErrorMessage(err),
      })
    }
  })
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

const productById = async (req, res, next, id) => {
  
  try{
    let product = await Product.findById(id)
    
    if (!product)
      return res.status('400').json({
        error: "product not found"
      })
    req.product = product
    console.log(req.product);
    next()
  }catch(err){
    console.log(err)
    return res.status('400').json({
      error: "Could not retrieve use product"
    })
  }
}

const photo = (req, res, next) => {
  

  res.set("Content-Type", req.product.photo.contentType)
 
  return res.send(req.product.photo.data)
  
}

export default {
    create,
    photo,
    read,
    productById
    
}