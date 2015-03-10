////////////  /utils/control.js
require('./to-title-case.js');
var cfg = require('../config/index');
var command = require('./command');
var specialStack = [];
var dieBuilder = [];


var recurseRoll = function(client, to, stack) {
  if(stack.length > 0){
    command.rollSpecial(client, to, stack.pop(), recurseRoll(client, to, stack));
  }
};

var getCard = function(client, from, message) {
  var cardName = message.match(/<([a-z]| |[',])*>/i)[0];
  cardName = cardName.toTitleCase();
  console.log(cardName);
  cardName = cardName.replace(/(<|>)/gi,"");
  command.getCard(client, cfg.room, cardName); 
};

var listProfiles = function(client, from, message){
  command.profileList(client, from);
};

var setProfile = function(client, from, message){
    
  var descString = message.slice(6).trim();
  if(descString.length > 0 ){
    var property = "desc";
    //client is bot, from is the requestor, descData is new description in JSON format
    command.setRecord(from, property, descString);
    client.notice(from, "Description Updated")
  }
};
  
var showStats = function(client, from, message){
  var to = from;
  var target;
  var params = message.split(' ');

  if(params.length <= 1){ 
    to = cfg.room,
    target = from
  } else { target = params[1]; }
  
  //client is bot, from is the requestor, to is the room, target is requested player's stats
  command.getRecord(target, function(err, record) {
    if(!err) {
      console.log(record.name +" "+record.stats);
      client.say(to, ""+command.statsToString(record.stats));
    }
  });
};

var updateStats = function(client, from, message){
  var params;
  params = message.split(' ');

  if(params.length === 7){
    var property = "stats";
    var statData = JSON.parse('{"Str":'+params[1]+', "Dex":'+params[2]+', "Int":'+params[3]+', "Wis":'+params[4]+', "Con":'+params[5]+', "Cha":'+params[6]+'}');

    command.setRecord(from, property, statData);
    }
};

var viewProfile = function(client, from, message){
  var params;
  params = message.split(' ');
  var to = from;
  var target;

  
  if(params.length <= 1){ 
    to = cfg.room,
    target = from
  } else { target = params[1]; }
  
  
  command.getRecord(target, function(err, record) {
    if(!err) {
      if(record != null)
      client.say(to, target+" - \""+record.desc+"\"");
    }else{client.say(to, cfg.txt['emptyProfile'])}
  });
};

var changeRoom = function(client,from, message){
  var params;
  params = message.split(' ');
  params.push(cfg.defaultRoom)
  client.part(cfg.room)
  cfg.room = params[1];
  client.join(cfg.room);
};

var helpDisplay = function(client, from, message){

  if(/^!help !!special/i.test(message)){
    client.say(from, cfg.text['specialDice']);
  }
  else if(cfg.ops[from] === "@"){
    client.say(from, cfg.text['suCmmdList']);
  }
  else{
    client.say(from, cfg.text['cmmdList']);
  }
};

var rollSpecial = function(client, from, message){
  var to = cfg.room;
  var params = message.split(' ');


  if(params.length <= 1){ 
    client.say(to, "Error - use is !special dieName");
  }
  else{
    sDie = params[1];
    //console.log(client+"\n"+ to+"\n"+ sDie+"\n");
    command.rollSpecial(client, to, from, sDie, function(err, record) {});
    
  }
};

var newSpecial = function(client, from, message){
  var params = message.split(' ');
  var to = from;
  var dieName = params[1]
  var dieBegin = params[0] + params[1] + 1;
  var sideDataString, sideData;
  
  sideDataString = message.slice(dieBegin).trim(); //parse to JSON
  
  console.log(sideDataString+"\n");
  sideData = JSON.parse(sideDataString);
  
  for(i=0;i<sideData.length;i++){
    console.log("\""+sideData[i].face+"\": "+sideData[i].numSides +" sides\n");
  }
  
  command.setSpecial(from, dieName, sideData, function(err, record) {});
};

var rollDice = function(client, from, message){
  console.log(from);
  command.rollDice(client, cfg.room, from, message);
};

var log = function(client, from, message){
  console.log(from + ": " + message);
};

var listDice = function(client, from, message){
  var params = message.split(' ');
  var to = from;
  var target = null;
  
  if(params.length > 1){ target = params[1]; }
  
  command.listDice(client, to, target);

};

var sudo = function(client, from, message){
  cfg.ops[from] = "@";
  cfg.ops.count++;
  client.say(from, "Sudo");
  console.log("your status" + cfg.ops[from]);
};

var showMode = function(client, from, message){
    if(cfg.ops[from] === "@"){
      client.say(from, "Superuser mode");
    }
    client.say(from, dieBuilder.length + " sides ready for entry");
    client.say(from, cfg.ops.count+" active botOPs");
    console.log(cfg.ops);
    console.log(dieBuilder);
}

var buildDie = function(client, from, message){
    
  var sideDataString = message.slice(6).trim(); //parse to JSON
  
  console.log(sideDataString+"\n");
  sideData = JSON.parse(sideDataString);
  
  dieBuilder.push(sideData);
  
  for(i=0;i<sideData.length;i++){
    console.log("\""+sideData[i].face+"\": "+sideData[i].numSides +" sides\n");
  }
}

var dumpDie = function(client, from, message){
  var dieName = message.slice(5).trim();
  
  command.setSpecial(from, dieName, dieBuilder, function(err, record) {});

};

var endSudo = function(client, from, message){
  cfg.ops[from] = null;
  cfg.ops.count--;
  console.log(cfg.ops);
};

var multiRoll = function(client, from, message){
  var params = message.split(' ');
  for(i=1;i<params.length;i++){

    specialStack.push(params[i]);
    recurseRoll(client, out, specialStack);
  }
}



var control = {
  getCard: getCard,
  listProfiles: listProfiles,
  setProfile: setProfile,
  showStats: showStats,
  updateStats: updateStats,
  viewProfile: viewProfile,
  changeRoom: changeRoom,
  helpDisplay: helpDisplay,
  rollSpecial: rollSpecial,
  newSpecial: newSpecial,
  rollDice: rollDice,
  listDice: listDice,
  log: log,
  sudo: sudo,
  showMode: showMode,
  buildDie: buildDie,
  dumpDie: dumpDie,
  endSudo: endSudo,
  multiRoll: multiRoll
};

module.exports = control;