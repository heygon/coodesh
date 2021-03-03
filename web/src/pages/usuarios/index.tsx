import React, { useState } from 'react';

import './style.css';
import Menu from '../../components/menu';
import api from '../../services/api';
import TabelaUsuarios from '../../components/TabelaUsuarios';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
import $ from 'jquery';



export default function Usuarios() {

    const [usuarios, setusurios] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const [idUs, setidUs] = useState('');
    const [TokenUsuario, setTokenUsuario] = useState('');

    const [Imagem, setImagem] = useState('');
    const [Nome, setNome] = useState('');
    const [Email, setEmail] = useState('');
    const [Genero, setGenero] = useState('');
    const [DataNascimento, setDataNascimento] = useState('');
    const [Telefone, setTelefone] = useState('');
    
    const [City, setCity] = useState('');
    const [state, setstate] = useState('');
    const [country, setcountry] = useState('');
    const [postcode, setpostcode] = useState('');
    const [streetNumber, setstreetNumber] = useState('');
    const [streetName, setstreetName] = useState('');
    
    
    
    

    async function listaUsuarios(){
        await api.get('/users')
        .then((e) => {
            if(e.data.user.length >= 1){
                console.log(e.data);
                setusurios(e.data.user);
                setTimeout(function(){
                    $(document).ready( function () {
                        $.getScript('../../assets/js/table.js', function(){
                            //$('#tblUsuarios').DataTable();
                        })
                    } );
                },2000);
                
            }
        })
        .catch((e) => {
            console.log(e);
        })
        
    }

    async function idUsuario(e:any){

        await api.get('/users/'+e)
        .then((e) => {
            if(e.data.resp === 's'){
                setShow(true);

                setidUs(e.data.user._id);
                setTokenUsuario(e.data.user.Token);
                setImagem(e.data.user.picture.large);
                setNome(e.data.user.name.first +' '+ e.data.user.name.last);
                setEmail(e.data.user.email);
                setGenero(e.data.user.gender);
                setDataNascimento(e.data.user.dob.date);
                setTelefone(e.data.user.phone);
                setCity(e.data.user.location.city);
                setstate(e.data.user.location.state);
                setcountry(e.data.user.nat);
                setpostcode(e.data.user.location.postcode);
                setstreetNumber(e.data.user.location.street.number);
                setstreetName(e.data.user.location.street.name);
                
            }
            
        })
        .catch((e) => {

        })
    }

    async function salvarDados(){
        let nome = Nome.split(' ');
        await api.put('/users/'+idUs,{
            nameFirst : nome[0],
            nameLast : nome[1],
            email : Email,
            gender : Genero,
            dobDate : DataNascimento,
            phone : Telefone,
            nat : country,
            locationStreetNumber : streetNumber,
            locationStreetName : streetName,
            locationCity : City,
            locationState : state,
            locationCountry : country,
            locationPostcode : postcode,
            Token : TokenUsuario
        })
        .then((e) => {
            if(e.data.resp === 's'){
                setShow(false);
                listaUsuarios();
            }
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
                        <table id="tblUsuarios" className="table col-12">
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
                <Modal.Body>
                    <img src={Imagem} alt={Nome} className="usuarioAvatar"/>


                    <InputGroup className="mb-3 p-3">
                        <span className="col-12" >Nome</span>
                        <br/>
                        <FormControl
                            placeholder="Nome"
                            value={ Nome }
                            onChange={ (e) => { setNome(e.target.value) } }
                        />
                    </InputGroup>
                    <InputGroup className="mb-3 p-3">
                        <span className="col-12" >Genero</span>
                        <br/>
                        <FormControl
                            placeholder="Genero"
                            value={ Genero }
                            onChange={ (e) => { setGenero(e.target.value) } }
                        />
                    </InputGroup>
                    <InputGroup className="mb-3 p-3">
                        <span className="col-12" >E-mail</span>
                        <br/>
                        <FormControl
                            placeholder="E-mail"
                            value={ Email }
                            onChange={ (e) => { setEmail(e.target.value) } }
                        />
                    </InputGroup>
                    <InputGroup className="mb-3 p-3">
                        <span className="col-12" >DataNascimento</span>
                        <br/>
                        <FormControl
                            placeholder="Data de Nascimento"
                            value={ DataNascimento }
                            onChange={ (e) => { setDataNascimento(e.target.value) } }
                        />
                    </InputGroup>
                    <InputGroup className="mb-3 p-3">
                        <span className="col-12" >Telefone</span>
                        <br/>
                        <FormControl
                            placeholder="Telefone"
                            value={ Telefone }
                            onChange={ (e) => { setTelefone(e.target.value) } }
                        />
                    </InputGroup>
                    <InputGroup className="mb-3 p-3">
                        <span className="col-12" >Cidade</span>
                        <br/>
                        <FormControl
                            placeholder="Cidade"
                            value={ City }
                            onChange={ (e) => { setCity(e.target.value) } }
                        />
                    </InputGroup>
                    <InputGroup className="mb-3 p-3">
                        <span className="col-12" >Estado</span>
                        <br/>
                        <FormControl
                            placeholder="Estado"
                            value={ state }
                            onChange={ (e) => { setstate(e.target.value) } }
                        />
                    </InputGroup>
                    <InputGroup className="mb-3 p-3">
                        <span className="col-12" >Pais</span>
                        <br/>
                        <FormControl
                            placeholder="Pais"
                            value={ country }
                            onChange={ (e) => { setcountry(e.target.value) } }
                        />
                    </InputGroup>
                    <InputGroup className="mb-3 p-3">
                        <span className="col-12" >CEP</span>
                        <br/>
                        <FormControl
                            placeholder="CEP"
                            value={ postcode }
                            onChange={ (e) => { setpostcode(e.target.value) } }
                        />
                    </InputGroup>
                    <InputGroup className="mb-3 p-3">
                        <span className="col-12" >Endereço</span>
                        <br/>
                        <FormControl
                            placeholder="Endereço"
                            value={ streetName }
                            onChange={ (e) => { setstreetName(e.target.value) } }
                        />
                    </InputGroup>
                    <InputGroup className="mb-3 p-3">
                        <span className="col-12" >Número</span>
                        <br/>
                        <FormControl
                            placeholder="Número"
                            value={ streetNumber }
                            onChange={ (e) => { setstreetNumber(e.target.value) } }
                        />
                    </InputGroup>

                    

                </Modal.Body>
                <Modal.Footer className="col-12">
                    <div className="row col-12">
                        <div className="col-6">
                            <Button className="col-12" variant="secondary" onClick={handleClose}>
                                Cancelar
                            </Button>
                        </div>
                        <div className="col-6">
                            <Button className="col-12" variant="primary" onClick={salvarDados}>
                                Salvar
                            </Button>
                        </div>
                    </div>  
                </Modal.Footer>
            </Modal>


        </div>

  );
}

