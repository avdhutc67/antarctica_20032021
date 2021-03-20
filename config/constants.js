// var ip = require("ip");


var host_name = env_vars['HOST_NAME'];
var port = env_vars['PORT'];
var config_vars = {};
config_vars['SITE_URL'] = env_vars['SITE_URL'];
config_vars['STATIC_URL'] = env_vars['STATIC_URL'];
config_vars['HOST_NAME_PORT'] = env_vars['HOST_NAME_PORT'];


/*Define Config Variables here*/
config_vars['HOST_NAME'] = host_name;
config_vars['PORT'] = port;

config_vars['CSS_URL'] = config_vars['SITE_URL']+'css/';
config_vars['JS_URL'] = config_vars['SITE_URL']+'js/';


/*Export Config Variables here*/
module.exports = config_vars;