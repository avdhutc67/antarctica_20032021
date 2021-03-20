/*
*==================================================================
* Project: Antarctica
* Controller: Home
* Created By: Avdhut Chavan
* Note: Please read comments before doing any task. 
        Commented code is only reference.
*=================================================================
*/
const {
    promisify
} = require("util");
const common = appRequire('common_functions');
const constant = appRequire('constant');
var dateFormat = require('dateformat');
var home_model = require('../models/home_model');


/*==================== End of All Modules declaration ====================*/

exports.home = async function(req, res, next) {
    /*
    *==================================================================
    * Declare All the Varibles Here only
    *=================================================================
    */
    temp_vars = {};
    var promise1;
    /*==================== End of Declaration of all variables ====================*/

    if (req.session.loggedin) {
        temp_vars['loggedin'] = req.session.loggedin;
        temp_vars['user_session'] = req.session;
        /*promise1 = home_model.getUsers().then((data) => {
            temp_vars['emp'] = data;
        });*/
    } else {
        temp_vars['loggedin'] = false;
    }

    /*
    *==================================================================
    * Create Promise here
    *=================================================================
    */
    Promise.all([
        promise1
    ]).then(() => {
        /*
        *==================================================================
        * Assign Template Varibles Here
        *=================================================================
        */
        temp_vars['constant'] = constant;
        temp_vars['viewpath'] = req.app.get('views');
        /*==================== End of Assignment of Template Variables ====================*/
        // console.log(JSON.stringify( temp_vars['fCrickWidgetData'], null, "  "));
        /*
        *==================================================================
        * assignTempVars() creates variables for template
        * Please do not remove this function untill it's not in use
        *=================================================================
        */
        templateVars = {};
        templateVars = common.assignTempVars(temp_vars);
        /*==================== End of assignTempVars() ==============================*/
        // res.send(temp_vars['emp']);
        /*
        *==================================================================
        * Render View Here only
        *=================================================================
        */
        res.render('list_view', templateVars); 
        /*==================== End of rendering a view ==============================*/
    })
}


exports.register = function(req, res, next) {
    /*
    *==================================================================
    * Declare All the Varibles Here only
    *=================================================================
    */
    temp_vars = {};
    var promise1;
    /*==================== End of Declaration of all variables ====================*/
    if(Object.keys(req.body).length > 0)
    {
        promise1 = home_model.createUser(req.body).then((data) => {
            temp_vars['sucMsg'] = data;
        });
    }

    /*
    *==================================================================
    * Create Promise here
    *=================================================================
    */
    Promise.all([
       promise1
    ]).then(() => {
        /*
        *==================================================================
        * Assign Template Varibles Here
        *=================================================================
        */
        temp_vars['constant'] = constant;
        temp_vars['viewpath'] = req.app.get('views');

        if (typeof req.session.errMsg !== 'undefined') {
            temp_vars['errMsg'] = req.session.errMsg;
            delete req.session.errMsg;
        }
        /*==================== End of Assignment of Template Variables ====================*/
        // console.log(JSON.stringify( temp_vars['fCrickWidgetData'], null, "  "));
        /*
        *==================================================================
        * assignTempVars() creates variables for template
        * Please do not remove this function untill it's not in use
        *=================================================================
        */
        templateVars = {};
        templateVars = common.assignTempVars(temp_vars);
        /*==================== End of assignTempVars() ==============================*/
        // res.send(temp_vars['emp']);
        /*
        *==================================================================
        * Render View Here only
        *=================================================================
        */
        res.render('register_view', templateVars); 
        /*==================== End of rendering a view ==============================*/
    })
}

exports.login = function(req, res, next) {
    /*
    *==================================================================
    * Declare All the Varibles Here only
    *=================================================================
    */
    /*==================== End of Declaration of all variables ====================*/
    if(Object.keys(req.body).length > 0)
    {
        user_email = req.body.user_email;
        user_password = req.body.user_password;
        if(user_email == "" || user_password == "")
        {
            req.session.errMsg = "Please enter both values Email and Password!";
            res.redirect('/register');
        }
        home_model.getUsers("",user_email,user_password).then((data) => {
            if (Object.keys(data).length > 0) {
                req.session.loggedin = true;
                req.session.user_email = user_email;
                req.session.user_id = data[0].user_id;
                req.session.first_name = data[0].user_fname;
                req.session.last_name = data[0].user_lname;
                res.redirect('/');
            } else {
                req.session.errMsg = "Invalid Email Or Password!";
                res.redirect('/register');
            }       
        });
    }
}
exports.logout = function(req, res, next) {
    req.session.destroy();
    res.redirect('/');
}

exports.getUserRecords = function(req, res, next) {
    iDisplayStart    =   (typeof req.body.iDisplayStart !== 'undefined') ? req.body.iDisplayStart : '0';
    iDisplayLength   =   (typeof req.body.iDisplayLength !== 'undefined') ? req.body.iDisplayLength : '10';
    iSortCol_0       =   (typeof req.body.iSortCol_0 !== 'undefined') ? req.body.iSortCol_0 : '0';
    sSortDir_0       =   (typeof req.body.sSortDir_0 !== 'undefined') ? req.body.sSortDir_0 : 'DESC';

    user_fname       =   (typeof req.body.user_fname !== 'undefined') ? req.body.user_fname : '';
    user_lname       =   (typeof req.body.user_lname !== 'undefined') ? req.body.user_lname : '';
    emp_id       =   (typeof req.body.emp_id !== 'undefined') ? req.body.emp_id : '';

      return home_model.getUsers('','','',"","",iSortCol_0,sSortDir_0,user_fname,user_lname,emp_id).then((data) => {
        count = Object.keys(data).length;
        home_model.getUsers('','','',iDisplayStart,iDisplayLength,iSortCol_0,sSortDir_0,user_fname,user_lname,emp_id).then((result) => {
            var columns = {};
            columns[0] = 'user_id';
            
            json_data = {
                                  "aaData" : result,
                                  "columns":columns,
                                  'recordsTotal':count,
                                  'recordsFiltered':count };
                res.write(JSON.stringify(json_data));
                res.end();
            });
        });
    
}