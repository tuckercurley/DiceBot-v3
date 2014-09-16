/////////   text.js
var irc = require('irc');

var text = {};


text.emptyProfile = "No Profile";

text.cmmdList = "Available commands:\n"
  +irc.colors.wrap("light_red", "!list")
  +" - see a list of profiles\n"
  +irc.colors.wrap("light_red", "!desc <name>")
  +" - view <name>'s description\n"
  +irc.colors.wrap("light_red", "!desc")
  +" - display your own description to the room\n"
  +irc.colors.wrap("light_red", "!!desc <text>")
  +" - set your own description\n"
  +irc.colors.wrap("light_red", "!roll XdY+Z")
  +" - Roll X Y-sided dice, add Z to the total\n"
  +irc.colors.wrap("light_red", "!roll XdY+Z (TN)")
  +" - Roll X Y-sided dice, add Z to each, and compare to (TN)\n"
  +irc.colors.wrap("light_red", "!dicelist")
  +" - See a list of all special dice\n"
  +irc.colors.wrap("light_red", "!dicelist <DieName>")
  +" - See the details of special die <DieName>\n"
  +irc.colors.wrap("light_red", "!special <DieName>")
  +" - Roll special die <DieName>\n"
  +"Leave a message via the bot with "
  +irc.colors.wrap("light_red", "!log <message>");
    
text.suCmmdList = irc.colors.wrap("light_red", "!mode") 
  + " - Show sides in build stack, active botOps\n"
  + irc.colors.wrap("light_red", "!build <JSON>")
  + " - Add one side of a user-die to the build stack.\n"
  + irc.colors.wrap("light_red", "!dump <dieName>")
  + " - Make a die from the sides in the build stack with name <dieName>\n"
  + irc.colors.wrap("light_red", "!multi [die1, die2,..]")
  + " - Roll multiple user-dice specified by name\n"
  + irc.colors.wrap("light_red", "!exit")
  + " - Leave Superuser Mode"
  
text.specialDice = "!!special <Die Name(no spaces)> [ {\"face\" : \"<Face Text>\", \"numSides\" : <Number of Sides> }, ... ]\n";

module.exports = text; 