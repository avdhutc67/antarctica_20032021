const http = require('http');
var express = require('express');
var app = express();
var multer = require('multer')
var constants = require('constants');
const querystring = require('querystring');
var path = require('path');
const {promisify} = require("util");
var mysql = require('mysql');

const requireConfig = require('./require.config');
global.appRequire = alias => require(path.join(__dirname, `/${requireConfig[alias.toLowerCase()]}`));
global.constant = "";
global.serverPrefix = '';
global.cricketData = ''; 
global.covidData = ''; 
global.covidCatData = '';
global.environment =  "Development";//"Development"; //Production

var env_file = process.env.NODE_ENV || 'env_development';
global.env_vars = appRequire(env_file);

const constant = appRequire('constant');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var dateFormat = require('dateformat');
const { addSlashes, stripSlashes } = require('slashes');
var htmlDecode = require('decode-html');
constant.stripSlashes = stripSlashes;
constant.htmlDecode = htmlDecode;
var now = new Date();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
//set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
//app.use(bodyParser()); // get information from html forms
//view engine setup
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// constant ======================================================================


// routes ======================================================================
require('./config/routes.js')(app, function() { // load our routes and pass in our app and fully configured passport
    //launch ======================================================================
    // app.listen(port);
    // console.log(common_functions.cleanText);
    var options = {
        hostname: constant['HOST_NAME'],
        port: constant['PORT']
    }
    const server = http.createServer(app);
    //res.write("hello world\n");
    server.listen(options, (err, res, body) => {
        console.log(`Server running at http://${options.hostname}:${options.port}/`);
    });
    //catch 404 and forward to error handler

     
    app.use(function(req, res, next) {
        /*if(res.status(404).statusCode == 404 || res.status(500).statusCode == 500)
        {
            const error_controller = appRequire('error_controller');
            return error_controller.error(req,res);
        }*/
        res.status(404).render('404', {
            title: "Sorry, page not found",
            // session: req.sessionbo
        });
    });
    /*app.use(function(req, res, next) {
        res.status(500).render('404', {
            title: "Sorry, page not found"
        });
    });*/
    exports = module.exports = app;
});