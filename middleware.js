var jwt = require('jwt-simple');  
var moment = require('moment');  
var config = require('./config');

exports.ensureAuthenticated = function(req, res, next) {  
  if(!req.headers.authorization) {
    return res
      .status(403)
      .send({error:true,message: "Tu petición no tiene cabecera de autorización"});
  }

  var token = req.headers.authorization.split(" ")[1];
  try{
    var payload = jwt.decode(token, config.TOKEN_SECRET);

    if(payload.exp <= moment().unix()) {
       return res
           .status(401)
          .send({error:true,message: "El token ha expirado"});
    }

    req.user = payload.sub;
    next();
  }catch(error){
    console.log(error);
    return res
           .status(401)
          .send({error:true,message: "Token Invalido"});
  }
  
}