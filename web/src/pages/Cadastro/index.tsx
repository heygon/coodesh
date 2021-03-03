import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './style.css';
import Logo from './../../assets/images/logo.png';
import api from '../../services/api';

function Cadastro() {
    const history = useHistory();

    const [nome,  setNome]  = useState('');
    const [email, setEmail] = useState('');
    const [cpf,   setCPF]   = useState('');
    const [senha, setSenha] = useState('');

    function salvarCadastro(){
        console.log({
            nome,
            email,
            cpf,
            senha,
            perfil : 1
        });

        api.post('users',{
            nome,
            email,
            cpf,
            senha,
            perfil : 1
        }).then(() => {
            alert('Cadastro realizado com sucesso');
            history.push("/");
        }).catch(() => {
            alert('Erro no Cadastro');
        })
    }


    return (
        <div className=" cardLogin row">
            
            <div className="cardl col-4">
                <img src={Logo} alt="Logo"/>
                <div className="col-12">&nbsp;</div>
                <h2 className="text-center">Cadastre-se</h2>
                <div className="col-12">&nbsp;</div>
                <div className="input-group input-group-lg mb-3">
                    <strong className="col-12">Nome</strong>
                    <input type="text" className="form-control rounded" placeholder="Digite seu Nome" value={nome} onChange={ (e) => { setNome(e.target.value) } } />
                </div>
                <div className="input-group input-group-lg mb-3">
                    <strong className="col-12">E-mail</strong>
                    <input type="email" className="form-control rounded" placeholder="Digite seu E-mail"  value={email} onChange={ (e) => { setEmail(e.target.value) } } />
                </div>
                <div className="input-group input-group-lg mb-3">
                    <strong className="col-12">CPF</strong>
                    <input type="tel" className="form-control rounded" placeholder="Digite seu CPF"  value={cpf} onChange={ (e) => { setCPF(e.target.value) } } />
                </div>
                <div className="input-group input-group-lg mb-3">
                    <strong className="col-12">Senha</strong>
                    <input type="password" className="form-control rounded" placeholder="Senha"  value={senha} onChange={ (e) => { setSenha(e.target.value) } } />
                </div>
                <div className="col-12">&nbsp;</div>
                <div className="col-12 btn btn-success btn-lg" onClick={ salvarCadastro }>Cadastrar-se</div>
                <div className="col-12">&nbsp;</div>
                <div className="col-12 row text-center">
                    <Link to="/">
                        <strong className="cursor-pointer p-0">Voltar</strong>
                    </Link>
                </div>
                
            </div>

        </div>
  );
}

export default Cadastro;