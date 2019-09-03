var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');

require('dotenv').config();

//List routers
const resourceRouter = require('./routes/resource');
const indexRouter = require('./routes');
const searchRouter = require('./routes/search');
const spineIndexRouter = require('./routes/spineIndex');
const comparisonRouter = require('./routes/comparison');

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

//Set routes
app.use('/doc', resourceRouter);
app.use('/index', indexRouter);
app.use('/search', searchRouter);
app.use('/spine', spineIndexRouter);
app.use('/comp', comparisonRouter);

module.exports = app;
