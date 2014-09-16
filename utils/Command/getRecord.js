/////////////////////////////      getRecord.js
var cfg = require('../../config/index');
var db = cfg.profiles;


var sanitize = require('./sanitize');

var getRecord = function(target, callback){

  sanitize(target, db.findOne({"name" : target}, callback));
  
  
};
module.exports = getRecord;