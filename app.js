var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');

require('dotenv').config();

//List routers
const getResourceRouter = require('./routes/resource');
const getIndexRouter = require('./routes');
const searchRouter = require('./routes/search');
const comparison = require('./routes/comparison.js');

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

//Set routes
app.use('/doc', getResourceRouter);
app.use('/index', getIndexRouter);
app.use('/search', searchRouter);
app.use('/comp', comparison);

module.exports = app;
