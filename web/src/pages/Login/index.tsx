import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './style.css';
import Logo from './../../assets/images/logo.svg';
import api from '../../services/api';

function Login() {

    const history = useHistory();

    const [login,  setLogin]  = useState('');
    const [senha, setSenha] = useState('');

    function realizarLogin(){

        api.post('/users/login',{
            Email: login,
            Senha: senha,
        }).then((e) => {
            if(e.data.resp === 's' && e.data.Usuario.name.first !== undefined){
                localStorage.setItem('DadosCoodesh',JSON.stringify(e.data.Usuario));
                history.push("/home");
            }else{
                alert('Usuário não encontrado');
            }
        }).catch(() => {
            alert('Usuário não encontrado');
        })
    }

    
  return (
        <div className=" cardLogin row">
            
            <div className="cardl col-4">
                <img src={Logo} alt="Logo"/>
                <div className="col-12">&nbsp;</div>
                <h2 className="text-center">Login</h2>
                <div className="col-12">&nbsp;</div>
                <div className="input-group input-group-lg mb-3">
                    <strong className="col-12">E-mail</strong>
                    <input type="text" className="form-control rounded" placeholder="Digite seu E-mail" value={login} onChange={ (e) => { setLogin(e.target.value) } } />
                </div>
                <div className="input-group input-group-lg mb-3">
                    <strong className="col-12">Senha</strong>
                    <input type="password" className="form-control rounded" placeholder="Senha" value={senha} onChange={ (e) => { setSenha(e.target.value) } } />
                </div>
                <div className="col-12">&nbsp;</div>
                <div className="col-12 btn btn-info btn-lg" onClick={realizarLogin}>Entrar</div>
                <div className="col-12">&nbsp;</div>
                {/* <div className="col-12 row p-0 m-0">
                    <Link to="/recuperarSenha" className="cursor-pointer col-4 p-0">
                        <strong>Recuperar senha</strong>
                    </Link>
                    <span className="col-4 text-center">OU</span> 
                    <Link to="/cadastro"  className="cursor-pointer text-end col-4 p-0">
                        <strong>Cadastre-se</strong>
                    </Link>
                </div> */}
                
            </div>

        </div>
  );
}

export default Login;