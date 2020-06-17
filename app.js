var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const bodyParser = require('body-parser');
const addData = require('./addData/addData');

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
app.use(cors());

//Set routes
app.use('/api/doc', resourceRouter);
app.use('/api/index', indexRouter);
app.use('/api/search', searchRouter);
app.use('/api/spine', spineIndexRouter);
app.use('/api/comp', comparisonRouter);
app.use('/api/line', lineRouter);

console.log('trigger db entries');

addData.addData().then(() => {
    console.log('ending adding data');
});

module.exports = app;
