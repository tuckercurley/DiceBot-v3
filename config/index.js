//  In Windows command line:
//  set NODE_ENV=<envir>
//  node bot

var env = process.env.NODE_ENV || 'default'
  , cfg = require('./config.'+env);
  
module.exports = cfg;