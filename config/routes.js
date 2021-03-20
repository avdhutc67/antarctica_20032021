const fs = require('fs');

const controllersFolder = 'app/controllers';
const checkControllersFolder = './'+controllersFolder;
var totalitemCount = 0;

var glob = require("glob");
var getDirectories = function(src, callback) {
    glob(src + '/**/*.js', callback);
};

module.exports = async function(app, callbackMain) {
    getDirectories(controllersFolder, function(err, res) {
        if (err) {
            console.log('Error', err);
        } else {
            totalitemCount = res.length;

            for (const [key, value] of Object.entries(res)) {
                filepath = value.split(".js")[0];
                
                filename = filepath.split("/");

                mainfilename = filename[filename.length-1];

                if(filename[filename.length-2] != "controllers")
                {
                    mainfilename = filename[filename.length-2]+"_"+filename[filename.length-1];
                }

                // console.log(mainfilename);
                requirefile = "require('../" + filepath + "')";
                eval('var ' + mainfilename + '= ' + requirefile + ';');
            }

            /*
             *==================================================================
             * Create All routes in below block
             * If you need to add your own variables then please create variables in below block.
             * e.g. var homeController = require('../app/controllers/firstpost/homeController');
             * route with variable: app.get('/:category_id/:article_slug-:article_id(\\d+).html' ,  article.article);
             * regex route: app.get(/^\/(.*)\/(.*)-(\d{4,})(-\d|).html$/ims ,  article.article);
             * static path route: app.get('/:pageType(terms-of-use|privacy|about-firstpost)' ,  staticController.static);
             *
             * Pattern of automatic variable is mentioned below:
             * Suppose, a path is like app/controllers/firstpost/homeController.js
             * then your variable name will be firstpost_homeController
             * Another e.g. suppose, a controller is in root folder like app/controllers/configController.js
             * then your variable name will be configController
             *=================================================================
            */

            app.get('/' ,  homeController.home);
            app.post('/getUserRecords' ,  homeController.getUserRecords);
            app.get('/logout' ,  homeController.logout);
            app.get('/register' ,  homeController.register);
            app.post('/register' ,  homeController.register);
            app.post('/login' ,  homeController.login);


            /*
             *==================================================================
             * Create All routes in above block
             *=================================================================
            */
            callbackMain();
        }
    });
    
    //app.get(/^\/(.*)\/(.*)-(\d{4,})(-\d|).html$/ims ,  article.article);
    // app.get('/:category_id/:article_slug-:article_id(\\d+).html' ,  article.article);
    // app.get('/signup', home.signup);
    /*app.get('/', home.loggedIn, home.home);//home
    app.get('/home', home.loggedIn, home.home);//home*/
    /*app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/home', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));
    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/home', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));*/
}