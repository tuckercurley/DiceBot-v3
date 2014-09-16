///////////  config.default.js
var config = module.exports = {};
var mongojs = require('mongojs');

// IRC
config.room = "#";
config.defaultRoom = "#";
config.server = "irc.freenode.com";
config.nick = "|Bot|";
config.ac = false;


//OP STATUS
config.ops = {"count":0};

//TEXT
config.text = require('./text');



/*  MongoDB
config.collections[0] = profile data
config.collections[1] = special dice
*/
config.collections = ['players', 'dice'];
config.dbpath = 'localhost/players';

var mongdb = mongojs(config.dbpath);

config.profiles = mongdb.collection(config.collections[0]);
config.dice = mongdb.collection(config.collections[1]);

