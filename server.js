'use strict'

const express         = require('express');
const path            = require('path');
const logger          = require('morgan');
const methodOverride  = require('method-override');
const session         = require('express-session');
const bodyParser      = require('body-parser')
const app             = express();
const port            = process.env.PORT || 3000;

const homeRoute       = require('./routes/home')
const userRoute       = require('./routes/users')
const patientRoute    = require('./routes/patients')

app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: "authenticate!",
  cookie: {maxAge:600000}
}));

app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use('/bower_components', express.static(path.join(__dirname, '/bower_components')))

app.listen(port, function(){
  console.log("I have the honor to be your obedient server,", port);
});

//ROUTES
app.use('/', homeRoute);
app.use('/user', userRoute);
app.use('/patient', patientRoute)
