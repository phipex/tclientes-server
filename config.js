module.exports = {  
  TOKEN_SECRET: process.env.TOKEN_SECRET || "tokenultrasecreto",
  PORT: process.env.OPENSHIFT_NODEJS_PORT || 3000,
  MONGO: process.env.OPENSHIFT_MONGODB_DB_URL || "mongodb://localhost/restapi",
  IP: process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

};