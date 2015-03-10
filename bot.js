var cfg = require('./config/index');
var irc = require('irc');
var math = require('Math');
var control = require('./utils/control');
var matcher = require('./matcher');
text = cfg.txt;



/**************************
**  Basic IRC bot stuff  **
**************************/
    // Create 
    var client = new irc.Client(cfg.server, cfg.nick,
    { 
      channels: [cfg.room],
      autoConnect: cfg.ac
    });
    
    client.connect(function(){ 
    client.send('MODE', cfg.nick, '+B');
    client.say("nickserv", cfg.idString);
    });
    
/********************
**  END IRC SETUP  **
********************/


/*************************
**  SUDO COMMAND BLOCK  **
*************************/
var specialStack = [];
var dieBuilder = [];


var recurseRoll = function(client, to, stack) {
  if(stack.length > 0){
    command.rollSpecial(client, to, stack.pop(), recurseRoll(client, to, stack));
  }
};

var sudoCmmds = function(client, from, to, message){
  
  console.log("Status Verify = " + ops[from]);
    
  var params;
  params = message.split(' ');
  var out =cfg.room;
  
  if(/^!mode/i.test(message)){
    if(ops[from] === "@"){
      client.say(from, "Superuser mode");
    }
    client.say(from, dieBuilder.length + " sides ready for entry");
    client.say(from, ops.count+" active botOPs");
    console.log(ops);
    console.log(dieBuilder);
    
  }

  if(/^!build/i.test(message) && ops[from] === "@"){
    var to = from;

    
    var sideDataString = message.slice(6).trim(); //parse to JSON
    
    console.log(sideDataString+"\n");
    sideData = JSON.parse(sideDataString);
    
    dieBuilder.push(sideData);
    
    for(i=0;i<sideData.length;i++){
      console.log("\""+sideData[i].face+"\": "+sideData[i].numSides +" sides\n");
    }
    
  }
  
  if(/^!multi/i.test(message) && ops[from] === "@"){
    
    for(i=1;i<params.length;i++){
 
      specialStack.push(params[i]);
      recurseRoll(client, out, specialStack);
    }
  }
  
  if(/^!dump/i.test(message) && ops[from] === "@"){
    
    var dieName = message.slice(5).trim();
    
    command.setSpecial(from, dieName, dieBuilder, function(err, record) {});
  }

  if(/^!exit/i.test(message) && ops[from] === "@"){
    
    ops[from] = null;
    ops.count--;
    console.log(ops);
  }

};
/***************************
**  END OF SUDO COMMANDS  **
***************************/

/***************************
****************************
***                      ***
***  MAIN LISTENER BODY  ***
***                      ***
****************************
***************************/
client.addListener('message', function (from, to, message) {
  //console.log(from + " => " + to + ":::" + message);
  
  message = message.replace(/[\u2018\u2019]/g, "'");
  
  matcher(client, from, message);
  
  });
  

 // sudoCmmds(client, from, to, message);
