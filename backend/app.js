const express = require('express'); //calling the express library of the node
const app = express(); //this app will call the func express that we just made

require('dotenv/config'); //use to get some specific values from the .env file we made.
const api = process.env.API_URL; //processing the API_URL variable from the .env file
const morgan = require('morgan');
const productsRouter = require('./routers/products');
const mongoose = require('mongoose')
    //middleware
app.use(express.json()); //bodyparser.json() is depreciated now.
app.use(morgan('tiny'));

app.use(`${api}/products`, productsRouter)

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