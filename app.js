require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var passport = require('./auth/passport')


var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var historyRouter = require('./routes/history');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../youtube/build')));

app.use(session({
  secret: "NOT_A_GOOD_SECRET",
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

// Routes
// app.use('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../youtube/build/index.html'))
// })
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/history', historyRouter);

app.use('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../youtube/build/index.html'))
})
module.exports = app;