////////////////// statsToString.js
function statsToString(stats) {
  var a = stats.Str,
      b = stats.Dex,
      c = stats.Int,
      d = stats.Wis,
      e = stats.Con,
      f = stats.Cha;
  return [
    "Str: "+a, 
    "Dex: "+b, 
    "Int: "+c, 
    "Wis: "+d, 
    "Con: "+e, 
    "Cha: "+f
  ].join(' | ');
}

module.exports = statsToString;