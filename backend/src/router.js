const express      = require('express');
const routes       = express.Router();
const requireDir   = require('require-dir');



const authMiddleware = require('./middleware/auth');


//Carrega todos os models e deixa úblico
requireDir('./models');


// Chama os controllers
const user       = require('./controllers/userController.js');

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
////////
////////        Rotas de Usuarios
////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

routes.post('/users/cadastro', user.cadastro);
routes.post('/users/login', user.login);

routes.delete('/users/:userId',authMiddleware, user.delete);
routes.put('/users/:userId',authMiddleware, user.update);
routes.get('/users/:userId', user.view);
routes.get('/users', user.list);



module.exports = routes;