var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const bodyParser = require('body-parser');
const addData = require('./addData/addData');
const Sentry = require('@sentry/node');
const CaptureConsole = require('@sentry/integrations').CaptureConsole
require('dotenv').config();

//List routers
const resourceRouter = require('./routes/resource');
const indexRouter = require('./routes');
const searchRouter = require('./routes/search');
const spineIndexRouter = require('./routes/spineIndex');
const comparisonRouter = require('./routes/comparison');
const lineRouter = require('./routes/line');

var app = express();

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
        new CaptureConsole({levels: ['error']})
    ],
});

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

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



app.get('/debug-sentry', function mainHandler(req, res) {
    throw new Error('My first Sentry error!');
});


// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    res.statusCode = 500;
    res.end(res.sentry + "\n");
});
module.exports = app;
