require('babel-register');
const appConfig = require('./config.js');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const express = require('express');
const expressSession = require('express-session');
const helmet = require('helmet');
const LocalStrategy = require('passport-local').Strategy;
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const RateLimit = require('express-rate-limit');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const User = require('./models/user');

// Route files
const indexRouter = require('./routes/index');
const aircrafts = require('./routes/api/aircrafts');
const airlines = require('./routes/api/airlines');
const airports = require('./routes/api/airports');
const api = require('./routes/api/index');
const authentication = require('./routes/api/authentication');
const flights = require('./routes/api/flights');
const users = require('./routes/api/users');

const app = express();

// Connect to mongoose
mongoose.connect('mongodb://localhost/techandfly');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(compression());
app.use(passport.session());
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
const sessionValues = {
  cookie: {},
  name: 'sessionId',
  resave: false,
  saveUninitialized: true,
  secret: appConfig.expressSession.secret,
};
if (app.get('env') === 'production') {
  app.set('trust proxy', 1);
  sessionValues.cookie.secure = true;
}
app.use(expressSession(sessionValues));

// Webpcck Server
if (process.env.NODE_ENV !== 'production') {
  const webpackCompiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(webpackCompiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
      color: true,
      chunks: true,
      'errors-only': true,
    },
  }));
  app.use(webpackHotMiddleware(webpackCompiler, {
    log: console.log,
  }));
}

// Confiture rate limiter
const apiLimiter = new RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 50,
  delayMs: 0, // disabled
});
api.use('/api/', apiLimiter);

app.use('/api', api);
app.use('/api/aircrafts', aircrafts);
app.use('/api/airlines', airlines);
app.use('/api/airports', airports);
app.use('/api/authentication', authentication);
app.use('/api/flights', flights);
app.use('/api/users', users);
app.use('/*', indexRouter);

// Configure Passport
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
