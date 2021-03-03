import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './style.css';
import Menu from '../../components/menu';
import api from '../../services/api';


function Home() {

    const [usuarios, setusurios] = useState(0);

    function listaUsuarios(){

        api.get('/users/')
        .then((e) => {
            if(e.data.user.length >= 1){
                setusurios(e.data.user.length);
            }
        })
        .catch((e) => {})
        
    }


  return (
        <div className=" home row m-0" onLoad={ listaUsuarios }>
            <Menu />
            <div className="col-10 content p-0 m-0">
                <div className="topo m-0 p-3 col-12 text-center">
                    <h1>Home</h1>
                </div>

                <div className="row col-12 mt-5 pt-5">
                    <Link to="/usuarios" className="col-6 offset-3">
                        <div className=" boxHome p-5 cursor-pointer text-center" >
                            <h1 className="col s12">{usuarios}</h1>
                            <strong>Usuários</strong>
                        </div>
                    </Link>
                    
                </div>


            </div>
        </div>
  );
}

export default Home;