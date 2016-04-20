var mongoose = require('mongoose');  
var Client  = mongoose.model('client');

//GET - Return all client in the DB
exports.findAllClients = function(req, res) {  
    Client.find(function(err, client) {
    if(err) res.send(500, err.message);

    	res.status(200).jsonp(client);
    });
};

//GET - Return a client with specified ID
exports.findById = function(req, res) {  
    
	
	if (req.params.id) {//verificar que si ingresaran el id
		//TODO verificar que el id sea valido?
		Client.findById(req.params.id, function(err, client) {
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

    var client = new Client({
        name:    req.body.name,
		id:  	req.body.id,
		state:    req.body.state//TODO verificar el estado

    });

    client.save(function(err, client) {
        if(err) return res.status(500).send( err.message);
    	res.status(200).jsonp(client);
    });
};

//PUT - Update a register already exists
exports.updateClient = function(req, res) {  
    Client.findById(req.params.id, function(err, client) {
        client.name   = req.body.name;
        client.id    = req.body.id;
        client.state = req.body.state;//TODO verificar el estado
        

        client.save(function(err) {
            if(err) return res.status(500).send(err.message);
      		res.status(200).jsonp(client);
        });
    });
};

//DELETE - Delete a Client with specified ID
exports.deleteClient = function(req, res) {  
    Client.findById(req.params.id, function(err, client) {
        client.remove(function(err) {
            if(err) return res.status(500).send(err.message);
      		res.status(200).send();
        })
    });
};