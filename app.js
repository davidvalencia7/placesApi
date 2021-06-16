var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

const Place = require('./models/Place')

const DB = require('./config/database')
DB.connect();


var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.post('/places', (req, res) => {
  Place.create({
    title: req.body.title,
    description : req.body.description,
    acceptsCreditCard : req.body.acceptsCreditCard,
    openHour : req.body.openHour,
    closeHour: req.body.closeHour
  })
    .then( doc => {
      res.json(doc)
    })
    .catch(err => {
      console.log(err);
      res.json(err)
    })
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
