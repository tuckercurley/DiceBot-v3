///////////////////////////////    setRecord.js
var cfg = require('../../config/index');
var db = cfg.profiles;


var setRecord = function(target, property, pData, callback){
  
  console.log(target);
  console.log(property);
  console.log(pData);
    
  if(property === "stats"){
    db.findAndModify({
    query: { name: target },
    update: { $set: { stats : pData, name : target }}, upsert: true}, callback);
  }
  if(property === "desc"){
    db.findAndModify({
    query: { name: target },
    update: { $set: { desc : pData, name : target }}, upsert: true}, callback);
  }
  if(property === "saves"){
    db.findAndModify({
    query: { name: target },
    update: { $set: { saves : pData, name : target }}, upsert: true}, callback);
  }
  
};
  
module.exports = setRecord;