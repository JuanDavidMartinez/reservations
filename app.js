var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var requirementRouter = require('./routes/requirements');
var citiesRouter = require('./routes/cities');
var flightsRouter = require('./routes/flights');
var reservationsRouter = require('./routes/reservations');
var summaryRouter = require('./routes/summary-trip');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/jquery-ui', express.static(__dirname + '/node_modules/jquery-ui/dist/'));

app.use('/', indexRouter);
app.use('/requirements', requirementRouter);
app.use('/cities', citiesRouter);
app.use('/flights', flightsRouter);
app.use('/reservations', reservationsRouter);
app.use('/summary-trip', summaryRouter);

module.exports = app;
