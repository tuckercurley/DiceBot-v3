//////////////////////////     /utils/command.js

var   getCard = require('./command/getCard');
     listDice = require('./command/listDice'),
     sanitize = require('./command/sanitize'),
    setRecord = require('./command/setRecord'),
    getRecord = require('./command/getRecord'),
   diceRoller = require('./command/diceRoller');
   setSpecial = require('./command/setSpecial');
  profileList = require('./command/profileList'),
  rollSpecial = require('./command/rollSpecial');
statsToString = require('./command/statsToString');


var command = {
  getCard: getCard,
  listDice: listDice,
  sanitize: sanitize,
  rollDice: diceRoller,
  getRecord: getRecord, 
  setRecord: setRecord,
  setSpecial: setSpecial,
  profileList: profileList,
  rollSpecial: rollSpecial,
  statsToString: statsToString
};

module.exports = command;