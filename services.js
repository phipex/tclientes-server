var jwt = require('jwt-simple');  
var moment = require('moment');  
var config = require('./config');

exports.createToken = function(user) {  
  var payload = {
    sub: user.cid,
    iat: moment().unix(),
    exp: moment().add(14, "minutes").unix()
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
};