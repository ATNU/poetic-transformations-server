var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');

//List routers
const getResourceRouter = require('./routes/getResource');
const getInventoryRouter = require('./routes/getInventory');
const searchRouter = require('./routes/search');

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

//Set routes
app.use('/doc', getResourceRouter);
app.use('/inv', getInventoryRouter);
app.use('/search', searchRouter);

module.exports = app;
