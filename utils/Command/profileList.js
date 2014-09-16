///////////////////////////////    profileList.js
var cfg = require('../../config/index');
var db = cfg.profiles;


var profileList = function(client, to){

  db.find().forEach(function(err, records){
      if(!records){ return; }
      console.log("Sending list");
      client.say(to, records.name);
  });
  
};    
    
module.exports = profileList;