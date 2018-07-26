require('babel-register');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const RateLimit = require('express-rate-limit');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

// Route files
const aircrafts = require('./routes/api/aircrafts');
const airlines = require('./routes/api/airlines');
const airports = require('./routes/api/airports');
const flights = require('./routes/api/flights');
const api = require('./routes/api/index');
const indexRouter = require('./routes/index');

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
app.use(compression());
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));

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
app.use('/api/flights', flights);
app.use('/*', indexRouter);

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
