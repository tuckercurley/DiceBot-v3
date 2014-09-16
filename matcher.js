///////////////////
var control = require('./utils/control');
var cfg = require('./config/index');

var matcher = function(client, from, message){

  if(/^!list/i.test(message)){ control.listProfiles(client, from, message); }
  
  if(/^!desc/i.test(message)){ control.viewProfile(client, from, message); }
  if(/^!!desc/i.test(message)){ control.setProfile(client, from, message); }
  
  if(/^!stats/i.test(message)){ control.showStats(client, from, message); }
  if(/^!!stats/i.test(message)){ control.updateStats(client, from, message); }
  
  if(/^!roll/i.test(message)){ control.rollDice(client, from, message); }
  if(/^!dicelist/i.test(message)){ control.listDice(client, from, message); }
  if(/^!special/i.test(message)){ control.rollSpecial(client, from, message); }
  if(/^!!special/i.test(message)){ control.newSpecial(client, from, message); }
  
  if(/^!room/i.test(message)){ control.changeRoom(client, from, message); }
  if(/^!help/i.test(message)){ control.helpDisplay(client, from, message); }
  if(/^!log/i.test(message)){ control.log(client, from, message); }
  
  if(/^!powermode/i.test(message)){ control.sudo(client, from, message); }
  
  
  if(/^!kill/i.test(message)) {process.exit(0); }
  
  
  if(/^!mode/i.test(message)){ control.showMode(client, from, message); }
  
  if(cfg.ops[from] === '@'){
    console.log('SU commands active');
    if(/^!build/i.test(message)){ control.buildDie(client, from, message); }
    if(/^!dump/i.test(message)){ control.dumpDie(client, from, message); }
    if(/^!exit/i.test(message)){control.endSudo(client, from, message); }
    if(/^!multi/i.test(message)){ control.multiRoll(client, from, message); }
  }
  

};

module.exports = matcher;