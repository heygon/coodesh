import React, { useState } from 'react';

import './style.css';
import Menu from '../../components/menu';
import api from '../../services/api';
import TabelaUsuarios from '../../components/TabelaUsuarios';
import { Modal, Button } from 'react-bootstrap';


export default function Usuarios() {

    const [usuarios, setusurios] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function listaUsuarios(){
        await api.get('/users')
        .then((e) => {
            if(e.data.user.length >= 1){
                console.log(e.data);
                setusurios(e.data.user);
            }
        })
        .catch((e) => {
            console.log(e);
        })
        
    }

    function idUsuario(e:any){

        api.get('/users/'+e)
        .then((e) => {
            
            console.log(e);

            setShow(true);
            
        })
        .catch((e) => {

        })
    }


  return (
        <div className=" home row m-0" onLoad={ listaUsuarios }>
            <Menu />
            <div className="col-10 content p-0 m-0">
                <div className="topo m-0 p-3 col-12 text-center">
                    <h1>Usuários</h1>
                </div>

                <div className="col s12">&nbsp;</div>
                <div className="col s12">&nbsp;</div>
                <div className="col s12">&nbsp;</div>
                <div className="card col-10 offset-1 p-5">
                    <div className="card-content">
                        <h2 className="col-12">Usuários do sistema</h2>
                        <div className="col s12">&nbsp;</div>
                        <table className="table col-12">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Gender</th>
                                    <th>Birth</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.map(value => {
                                    return <TabelaUsuarios key={value} usuarios={ value } idUsuario={ idUsuario }  />
                                })} 
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>


        </div>

  );
}

