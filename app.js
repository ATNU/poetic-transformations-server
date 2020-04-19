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
const lineRouter = require('./routes/line');

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

//Allows CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'atnu-poetic-transformations-client.azurewebsites.net'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

//Set routes
app.use('/api/doc', resourceRouter);
app.use('/api/index', indexRouter);
app.use('/api/search', searchRouter);
app.use('/api/spine', spineIndexRouter);
app.use('/api/comp', comparisonRouter);
app.use('/api/line', lineRouter);

module.exports = app;
