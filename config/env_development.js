var  env_vars= {};
env_vars['HOST_NAME'] = "dev.antarctica.com";
env_vars['PORT'] = 8042;

env_vars['SITE_URL'] = "http://"+env_vars['HOST_NAME']+":"+env_vars['PORT']+'/';
env_vars['STATIC_URL'] = "http://"+env_vars['HOST_NAME']+":"+env_vars['PORT']+'/';
env_vars['HOST_NAME_PORT'] = env_vars['HOST_NAME']+":"+env_vars['PORT'];

/*Export Config Variables here*/
module.exports = env_vars;