///////////////// diceRoller.js
var math = require('Math');


var diceRoller = function(client, room, from, message){

  /*   Position Array description   {
  positions[0] = first digit of numDice
  positions[1] = character 'd'
  positions[2] = first digit of numSides
  positions[3] = mod, including + or -
  positions[4] = opening parens of Target number
  positions[5] = closing parens
   positions[6] = length of whole string
  }*/
 
  var positions = [];
  
  var params = message.slice(5);
  params = params.replace(/[ \t\r\s]/g,"");
  console.log(from+" rolls "+params);
  positions.push(params.search(/[0-9]+d/));
  positions.push(params.search(/d[0-9]/));
  positions.push(params.search(/d[0-9]/)+1);
  positions.push(params.search(/[+-][0-9]*/));
  positions.push(params.search(/\([0-9]*\)/));
  positions.push(params.search(/\)/));
  positions.push(params.length);
  console.log(positions);
  
  var numDice = ((positions[0] !== -1 ) ? Number(params.slice(positions[0], positions[1])) : 1);
  console.log("numDice: " + numDice);
  
  var endSides = -1,
      modEnd = -1;
  
  ///////  Clean this up
  for(i=3;i<positions.length;i++){
    if(endSides === -1){ endSides = positions[i]; }
  
  }
  //console.log("endSides: "+endSides +"\n");
  
  
  var numSides = Number(params.slice(positions[2], endSides));
  console.log("numSides: " + numSides);
  
  var modEnd = -1;
  for(i=4;i<positions.length;i++){
    if(modEnd === -1){ modEnd = positions[i]; }
  
  }
  //console.log("modEnd: "+modEnd +"\n");
  
  var mod=0;
  if(positions[3] !== -1) {
    mod = Number(params.slice(positions[3]+1, modEnd));
    if(params.slice(positions[3],positions[3]+1) === '-'){ mod = mod * -1;}
  }
  
  console.log("mod: " + mod);
  
  var target = ((positions[4] === -1) ? 0 : Number(params.slice(positions[4]+1, positions[5])));
  console.log("target: " + target);


  var rolledDice = [];
  for (i = 0; i < numDice; i++){
    rolledDice.push(Math.floor((Math.random() * numSides) + 1));
  }
  
  client.say(room,  "Rolls: [" + rolledDice + "]");  
  //display number of successes against target number
  var j=0;
  
  //   If traget number is set, compare each die with the target number and count successes
  if (target !== 0){
    for(i=0; i < rolledDice.length; i++){
      if(rolledDice[i] + mod > target){ j++; }
    }
    client.say(room, j +" successes against TN(" + target + ")");
  }  // If no target number given, total dice and output
  else{
    for(i=0; i < rolledDice.length; i++){
      j += rolledDice[i];
    }
  client.say(room, "Total: " + (j + mod));
  }
};

module.exports = diceRoller;