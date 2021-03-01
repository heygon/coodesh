import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import administradores from './pages/administradores';

import Cadastro from './pages/Cadastro';
import Home from './pages/Home';
import Login from './pages/Login';
import RecuperarSenha from './pages/recuperarSenha';
import usuarios from './pages/usuarios';


function Routes(){
    return(
        <BrowserRouter>
            <Route path="/" exact component={ Login } />
            <Route path="/cadastro" component={ Cadastro } />
            <Route path="/recuperarSenha" component={ RecuperarSenha } />
            <Route path="/home" component={ Home } />
            <Route path="/usuarios" component={ usuarios } />
            <Route path="/administradores" component={ administradores } />
        </BrowserRouter>
    )
}
export default Routes;