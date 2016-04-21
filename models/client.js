var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var clientSchema = new Schema({  
  name:    { type: String },
  cid:  { type: String },
  state:    { type: Number, enum:
  [
    0,//inactivo
    1 //activo
  ]
        },
  comment:  { type: String }
});

module.exports = mongoose.model('client', clientSchema);  