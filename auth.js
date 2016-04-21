// auth.js
var mongoose = require('mongoose');  
var User = mongoose.model('User');  
var service = require('./services');
// Importamos nuestros modelos, 
// en este ejemplo nuestro modelo de usuario
//require('./models/user');


//TODO pasar a util
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validarUserObject(body) {
    console.log(body);
    var user = body.user;
    var pass = body.password;
    var email = body.email;
    if (user && (user != "")
        && pass && (pass != "")
        && validateEmail(email)) {
        return true;
    }


    return false;
}

exports.emailSignup = function(req, res) {  
    console.log("emailSignup:"+req.body);
    if (validarUserObject(req.body)) {

        var body = req.body;
        var name = body.user;//TODO verificar si el usuario ya ha sido creado
        var pass = body.password;
        var email = body.email;//TODO verificar si el usuario ya ha sido creado

        //TODO varificar que si ingresen los datos correctamente

        var user = new User({
            name: name, 
            password: pass,
            email: email
        });

        user.save(function(err){
            //TODO reportar el error
            return res
                .status(200)
                .send({error:false,token: service.createToken(user)});
        });
    }else{
        res
        .status(400)
        .send({error:true,message: "No se ingresaron los datos correctamente"});
    }

    
};

exports.emailLogin = function(req, res) {  
    if (req.body.email && req.body.password) {
        // find the user
        User.findOne({email: req.body.email.toLowerCase()}, function(err, user){
            if(err) res.status(500).send({error:true, message:'Oops, Ocurrio un error'});
            if(!user){
                res.status(401).send({error:true, message:'Usuario no encontrado'});
            }else if(user){
                //comprobar password
                if(user.password != req.body.password){//TODO encriptar los pass
                    res.status(401).send({error:true, message:'La contraseña no es correcta'});
                }else{
                    
                    res.send({error:false, message:'Autenticación exitosa', token:service.createToken(user)});
                }
            }
        });


        
    }else{
        res
        .status(400)
        .send({error:true,message: "No se ingresaron los datos correctamente"});
    }

    
};