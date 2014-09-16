//////////// listDice.js
var cfg = require('../../config/index');
var db = cfg.dice;


var listDice = function(client, to, target){
  var listBuilder = [];
  
  var showDie = function(err, record){
  if(record !== null){
      for(i=0; i<record.sides.length; i++){
        client.say(to, record.sides[i].numSides+" faces that say, \""+record.sides[i].face+"\"");
      }
    }
    else{
      client.say(to, "No special die by that name");
    }
  };
  
  if(target === null){
    console.log("No target specified, listing all dice");
    db.find().forEach(function(err, records){
          if(records){
            listBuilder.push(records.name);
          }else{
            client.say(to, listBuilder.join(" | "));
            return;
          }
        
        });
    
  }
  else{
    db.findOne({"name" : target}, showDie);
  }
};

module.exports = listDice;