const express = require('express'); //calling the express library of the node
const app = express(); //this app will call the func express that we just made

require('dotenv/config'); //use to get some specific values from the .env file we made.
const api = process.env.API_URL; //processing the API_URL variable from the .env file
const morgan = require('morgan');
const mongoose = require('mongoose');


//middleware
app.use(express.json()); //bodyparser.json() is depreciated now.
app.use(morgan('tiny'));


const productSchema = mongoose.Schema({
    //defining the product schema
    name: String,
    image: String,
    countInStock: Number,


})

const Product = mongoose.model('Product', productSchema); //defining the product model

app.get(`${api}/products`, async(req, res) => {
    const productList = await Product.find();
    if (!productList) {
        res.status(500).json({
            success: false


        })
    }
    res.send(productList) // this response will be served whenever we visit our localhost

})

app.post(`${api}/products`, (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    })
    product.save().then((createdProduct => {
        res.status(201).json(createdProduct)
    })).catch((err) => {
        res.status(500).json({
            erorr: err,
            success: false

        })
    })


})

mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log('DB connection ready')
    })
    .catch((err) => {
        console.log(err)

    })



app.listen(3000, () => {
    console.log(api);
    console.log('server is running now on http://localhost:3000') // when app is running at port 3000 it will print that msg in the terminal
})