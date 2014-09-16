/////////// setSpecial.js
var cfg = require('../../config/index');
var db = cfg.dice;

/*{
    "name": "name",
    "author" : "author"
    "sides": [ {"face" : "faceText", "numSides" : X}]
  }
*/
 
var setSpecial = function(from, dieName, sideData, callback){

  db.findAndModify({
  query: { "name" : dieName, "author" : from},
  update: { $set: { "sides" : sideData } }, upsert: true}, callback);

};

module.exports = setSpecial;