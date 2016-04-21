// server.js
var express = require('express');  

var bodyParser = require('body-parser');  
var mongoose = require('mongoose');  
var cors = require('cors');
var config = require('./config');  

// Importamos nuestros modelos, 
// en este ejemplo nuestro modelo de usuario
require('./models/user');
require('./models/client');

var auth = require('./auth');  
var middleware = require('./middleware');
var client = require('./controllers/client');

// Configuramos Express
var app = express();  
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({extended: true}));  
app.use(cors());  


var port = config.PORT;
var mongo = config.MONGO;
var ip = config.IP;
app.set('port', port);
app.set('ip', ip);



// Iniciamos las rutas de nuestro servidor/API
var router = express.Router();

// ruta para probar nuestro servidor
router.get('/', function(req, res){
    console.log("llamado a la raiz");
    res.json({message: 'Ándale, arriba arriba, yepa yepa'});
});

// Rutas de autenticación y login
router.post('/auth/signup', auth.emailSignup);  
router.post('/auth/login', auth.emailLogin);


//rutas del crud de clientes
router.route('/v1/clients')
    .get(middleware.ensureAuthenticated,client.findAllClients)
    .post(middleware.ensureAuthenticated,client.addClient);

router.route('/v1/clients/:cid')
    .get(middleware.ensureAuthenticated,client.findById)
    .put(middleware.ensureAuthenticated,client.updateClient)
    .delete(middleware.ensureAuthenticated,client.deleteClient);


// Ruta solo accesible si estás autenticado
//TODO solo para prueba borrar
router.get('/private',middleware.ensureAuthenticated, function(req, res) {
	res.send({messaje:"desde un lugar privado"});
});

// Registrar las rutas con prefijo /api
app.use('/api', router);

// Iniciamos el servidor y la base de datos
mongoose.connect(mongo, function(err) {  
    // Comprobar errores siempre
    if (!err) {
        var port = app.get('port');
        var ip = app.get('ip');

        // app.listen(port, function(){
        //     console.log('Express corriendo en http://localhost:'+port);
        // });
        app.listen(port, ip, function(){
          console.log("Listening on " + ip + ", server_port " + port)
        });	
    }
    
});
//