const express = require('express');
var cors = require('cors');
const connection = require('./connection');
const userRoute = require('./routes/user');
const categoryRoute = require('./routes/category');
const productRoute = require('./routes/product');
const billRoute = require('./routes/bill');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/user', userRoute); // Whenever any API is hit, /user will go to userRoute and then to other parts
app.use('/category', categoryRoute);
app.use('/product', productRoute);
app.use('/bill', billRoute);

module.exports = app;