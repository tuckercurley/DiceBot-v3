//// getCard.js

//JSON card data from http://mtgjson.com/
var MtGcard = require('./AllCards-x.json');



var getCard = function(client, room, cardName){
  var card = MtGcard[cardName];
  
  if(!card)
  {
    client.say(room, "I don't think that's a Magic: the Gathering card...");
    return; 
  }
  
  client.say(room, card.name  + (card.manaCost ? ' - ' + card.manaCost : ""));
  client.say(room, card.type.replace("\u2014","-"));
  client.say(room, card.text.replace("\u2212","-"));
  if(card.types.indexOf('Creature') > -1)
  { client.say(room, card.power + '/' + card.toughness); }
  if(card.types.indexOf('Planeswalker') > -1)
  { 
    
    client.say(room, "Loyalty: " + card.loyalty);
  }

};

/*
var outString = card.text.replace("\u2212","-").split("").map(function (elem){ return elem.charCodeAt(0);});
    console.log(outString);
*/

module.exports = getCard;