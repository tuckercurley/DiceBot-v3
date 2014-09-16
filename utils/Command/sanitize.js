///////////////////////// sanitize.js
var cfg = require('../../config/index');
var db = cfg.profiles;

var sanitize = function(target, callback){

    db.findAndModify({
      query: { "name" : target, "desc" : { $exists : false } },
      update: { $set: { "desc" : "No description" } }}, callback);
};

module.exports = sanitize;