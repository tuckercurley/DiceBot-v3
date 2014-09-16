//////////////////////////     /utils/command.js

var  listDice = require('./command/listDice'),
     sanitize = require('./command/sanitize'),
    setRecord = require('./command/setRecord'),
    getRecord = require('./command/getRecord'),
   diceRoller = require('./command/diceRoller');
   setSpecial = require('./command/setSpecial');
  profileList = require('./command/profileList'),
  rollSpecial = require('./command/rollSpecial');
statsToString = require('./command/statsToString');
 

var command = {
  profileList: profileList,
  getRecord: getRecord, 
  setRecord: setRecord,
  rollDice: diceRoller,
  sanitize: sanitize,
  rollSpecial: rollSpecial,
  setSpecial: setSpecial,
  listDice: listDice,
  statsToString: statsToString
};

module.exports = command;