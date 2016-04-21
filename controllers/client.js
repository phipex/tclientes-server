var mongoose = require('mongoose');  
var Client  = mongoose.model('client');

// Importamos nuestros modelos,
// en este ejemplo nuestro modelo de usuario
//require('../models/client');

//GET - Return all client in the DB
exports.findAllClients = function(req, res) {  
    Client.find(function(err, client) {
    if(err) res.send(500, err.message);

    	res.status(200).jsonp(client);
    });
};

//GET - Return a client with specified ID
exports.findById = function(req, res) {  
    
	
	if (req.params.cid) {//verificar que si ingresaran el id
		//TODO verificar que el id sea valido?
		Client.findById(req.params.cid, function(err, client) {
			    if(err) return res.send(500, err.message);

			    //console.log('GET /tvshow/' + req.params.id);
		        res.status(200).jsonp(client);
		});

	}else{
		res.status(400).send("No ingreso un id")
	}
	
};

//POST - Insert a new client in the DB
exports.addClient = function(req, res) {  
    console.log('POST');
    console.log(req.body);

    var body = req.body;
    if (!(body.name && body.cid && body.state)) {
        res
            .status(400)
            .send({error: true, message: "No se ingresaron los datos correctamente"});
    } else {
        var client = new Client({
            name: req.body.name,
            cid: req.body.cid,//TODO verificar que no exista
            state: req.body.state//TODO verificar el estado

        });

        client.save(function (err, client) {
            if (err){
                return res.status(500).send({error: true, message: err.message});
            }
            res.status(200).jsonp(client);
        });
    }

};

//PUT - Update a register already exists
exports.updateClient = function(req, res) {  
    console.log(req.params.cid);
    Client.find({cid:req.params.cid} , function(err, client) {
        client = client[0];
        if(client){
            console.log(client);
            client.name   = req.body.name;
            //client.cid    = req.body.cid;//TODO verificar si existe
            client.state = req.body.state;//TODO verificar el estado


            client.save(function(err) {
                if(err){
                    return res.status(500).send(err.message);
                }
                res.status(200).jsonp(client);
            });
        }else{
            return res.status(404).send({error:true,message:"Cliente no encontrado"});
        }


    });
};

//DELETE - Delete a Client with specified ID
exports.deleteClient = function(req, res) {  
    Client.findById(req.params.cid, function(err, client) {
        client.remove(function(err) {
            if(err){
                return res.status(500).send(err.message);
            }
      		res.status(200).send();
        })
    });
};