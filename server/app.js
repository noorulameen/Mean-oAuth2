const  createError = require('http-errors');
const  express = require('express');
const path = require('path');
const  cookieParser = require('cookie-parser');
const  logger = require('morgan');
const  bodyParser = require('body-parser');
const  mongoConnection = require('./database/mongoConnection');
const mongoose = require('mongoose');

//const  indexRouter = require('./routes/index');

const  app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({limit:'20mb'}));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin','*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'accept, authorization, content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    }else {
        next();
    }
});

mongoose.Promise = global.Promise;

// Connecting to the database

mongoose.connect(mongoConnection.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();    
});


/*const User = require('./models/users.js');

//create a user a new user
var testUser = new User({
    username: 'ameen',
    password: 'password111'
});

//save user to database
testUser.save(function(err) {
    if (err) throw err;


// fetch user and test password verification
User.findOne({ username: 'ameen' }, function(err, user) {
    if (err) throw err;

    // test a matching password
    user.comparePassword('password111', function(err, isMatch) {
        if (err) throw err;
        console.log('password111:', isMatch); // -> Password123: true
    });

    // test a failing password
    user.comparePassword('123Password', function(err, isMatch) {
        if (err) throw err;
        console.log('123Password:', isMatch); // -> 123Password: false
    });
});
});*/



require('./routes/index')(app);

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
  res.render('error');
});
app.disable('x-powered-by');
module.exports = app;
