import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';
import Logo from './../../assets/images/logo.svg';

function Menu(){
    return (
        <div className="col-2 menu pt-5">
            <img src={Logo} alt="Logo" className="col-10 offset-1" />
            <div className="col-12">&nbsp;</div>
            <Link to="/home">
                <div className="col-12 p-4">
                    <i className="fa fa-home"></i> Home
                </div>
            </Link>
            <Link to="/usuarios">
                <div className="col-12 p-4">
                <i className="fa fa-user"></i> Usuários
                </div>
            </Link>
            <Link to="/sair">
                <div className="col-12 p-4">
                <i className="fa fa-power-off"></i> Sair
                </div>
            </Link>
        </div>
    )
}
export default Menu;
