import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './style.css';
import Logo from './../../assets/images/logo.png';
import api from '../../services/api';

function RecuperarSenha() {

    //const history = useHistory();

    const [email,    setemail]  = useState('');
    const [verToken, setverToken]  = useState('');
    const [token,    setToken]  = useState('');
    const [novotoken,    setnovoToken]  = useState('');
    const [novasenha,    setnovaSenha]  = useState('');
    const [sucesso,    setsucesso]  = useState('');


    function geraToken(){

        api.post('users/recuperarSenha',{
            email
        }).then((e) => {
            console.log(e);
            if(e.data.token !== '' || e.data.token !== null ){
                setverToken(e.data.token);
            }else{
                alert('Usuário não encontrado');
            }
        }).catch(() => {
            alert('Usuário não encontrado');
        })
    }

    function enviarNovaSenha(){

        api.post('users/novaSenha',{
            email,
            novotoken,
            novasenha
        }).then((e) => {
            console.log(e);
            if(e.data.resp === 's'){
                setsucesso('s');
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
                
                


                {sucesso === '' ?
                    <>
                    {token === '' ?
                        <>
                            {verToken === '' ?
                                <>
                                    <h2 className="text-center">Recuperar Senha</h2>
                                    <div className="col-12">&nbsp;</div>
                    
                                    <div className="input-group input-group-lg mb-3">
                                        <strong className="col-12">Informe seu E-mail ou CPF para recuperar a senha</strong>
                                        <input type="text" className="form-control rounded" placeholder="Digite seu E-mail ou CPF" value={email} onChange={ (e) => { setemail(e.target.value) } } />
                                    </div>

                                    <div className="col-12">&nbsp;</div>
                                    <div className="col-12 btn btn-success btn-lg" onClick={geraToken}>Enviar E-mail</div>
                                </>
                                :
                                <>
                                    <h2 className="text-center">Esse é o seu token</h2>
                                    <p>Copie esse token para criar uma nova senha, normalmente esse token é enviado por email, mas como pede na documentação, apenas vamos informa-lo aqui</p>
                                    <div className="col-12">&nbsp;</div>
                                    <div className="col-12 text-center">Seu Token <h2 style={{ color : 'red' }}>{verToken}</h2></div>
                                    <div className="col-12">&nbsp;</div>
                                    <div className="col-12 btn btn-success btn-lg" onClick={ () => { setToken(verToken) } }>Entendi</div>
                                </>
                            }
                        </>
                        :
                        <>
                            <h2 className="text-center">Criar nova senha</h2>
                            <p>Informe o token e a nova senha para acessar o sistema</p>
                            <div className="col-12">&nbsp;</div>
                            <div className="input-group input-group-lg mb-3">
                                <strong className="col-12">Informe seu Token</strong>
                                <input type="text" className="form-control rounded" placeholder="Digite seu Token" value={novotoken} onChange={ (e) => { setnovoToken(e.target.value) } }/>
                            </div>
                            <div className="input-group input-group-lg mb-3">
                                <strong className="col-12">Informe sua nova Senha</strong>
                                <input type="text" className="form-control rounded" placeholder="Digite sua nova Senha" value={novasenha} onChange={ (e) => { setnovaSenha(e.target.value) } } />
                            </div>
                            <div className="col-12">&nbsp;</div>
                            <div className="col-12 btn btn-success btn-lg" onClick={ enviarNovaSenha }>Entendi</div>
                        </>
                    }
                    </>
                    :
                    <>
                        <h2 className="text-center">Senha alterada com sucesso!</h2>
                        <p className="text-center">Use sua nova senha para realizar o login</p>
                        
                        <div className="col-12">&nbsp;</div>
                        <Link to="/">
                            <div className="col-12 btn btn-success btn-lg" >Entendi</div>
                        </Link>
                    </>
                }
                
                
                
                
                <div className="col-12">&nbsp;</div>
                <div className="col-12 text-center cursor-pointer">
                    <Link to="/">
                        <strong>Voltar</strong>
                    </Link>
                </div>
                
            </div>

        </div>
  );
}

export default RecuperarSenha;