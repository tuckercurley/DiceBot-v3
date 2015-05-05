/////////////////////////////       rollSpecial.js
var cfg = require('../../config/index');
var db = cfg.dice;


var rollSpecial = function(client, to, from, sDie, callback){

  var workhorse = function(err, record){
    
    if(record == null){
      client.say(to, "Error - no such die definied");
    }
    if(!err && record !== null){
    
      totalSides = 0;
      for (i=0;i<record.sides.length;i++){
      totalSides += record.sides[i].numSides
      }

      var roll = Math.floor((Math.random() * totalSides))+1;
      console.log("Rolled Special Die \""+sDie+" - "+roll);
      
      for (i=0;i<record.sides.length;i++){
        roll -= record.sides[i].numSides
        if (roll <= 0){
          client.say(to, from+": "+record.sides[i].face);
          break;
        }
      }
    }
  };

  
  db.findOne({"name" : sDie}, workhorse);
  
};

module.exports = rollSpecial;