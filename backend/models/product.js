const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    //defining the product schema
    name: String,
    image: String,
    countInStock: Number,


})

exports.Product = mongoose.model('Product', productSchema); //defining the product model