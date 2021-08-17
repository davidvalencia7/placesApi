var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const jwtMiddleware = require('express-jwt')


const  places = require('./routes/places')
const users = require('./routes/users')
const sessions = require('./routes/sessions')
const favorites = require('./routes/favorites')
const visit = require('./routes/visit')
const visitPlaces = require('./routes/visitPlaces')
const applications = require('./routes/applications')

//MIDDLEWARE
const findAppBySecret = require('./middlewares/findAppBySecret')
const findAppByApplicationId = require('./middlewares/findAppByApplicationId')
const authApp = require('./middlewares/authApp')()

const DB = require('./config/database')

const secrets = require('./config/secrets')

DB.connect();

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(findAppBySecret)
app.use(findAppByApplicationId)
app.use(authApp.unless({method: 'OPTIONS'}))

app.use(
  jwtMiddleware( {secret : secrets.jwtSecret, algorithms: ['HS256'] } )
  .unless({path: ['/sessions','/users'], method : ['GET','OPTIONS'] })
 )

app.use('/places',places) //montar el router de places
app.use('/places', visitPlaces)
app.use('/users', users)
app.use('/sessions', sessions)
app.use('/favorites', favorites)
app.use('/visits', visit)
app.use('/applications', applications)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(res.locals.error)
  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
