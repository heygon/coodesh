
const mongoose   = require('mongoose');
const SHA1       = require("crypto-js/sha1");
const User       = mongoose.model('Usern');


module.exports = {

    
    async login(req, res) {    
        /* 
            #swagger.tags = ['Usuarios']
            #swagger.description = 'Login do usuário'
            #swagger.summary = 'Login do usuário'


            #swagger.parameters['obj'] = { 
                in: 'body',
                description: '
                    <h4>Modelo de envio de dados</h4><br/>
                    <strong>E-mail</strong> : Email do usuário<br/>
                    <strong>Senha</strong> : Senha do usuário<br/>
                ',
                type: 'object',
                schema: { 
                    Email  : "Joao@Doria.com",
                    Senha  : "JoaoDoria123",
                }
            }    
        */


        const { Email, Senha } = req.body;

        

        try {
            const userEmail = await User.find({ email : Email });
            if(userEmail.length >= 1){

                const Rash = SHA1(Senha+userEmail[0].login.salt).toString();

                const usuario = await User.find({ 'login.sha1' : Rash, email : Email });
                if(usuario.length >= 1){
                    usuario[0].Token = SHA1(new Date().getTime().toString());
                    await usuario[0].save();

                    return res.status(200).json({ resp: 's', Usuario: usuario[0] }); 
                    /* #swagger.responses[200] = {
                        description : "Retorna um array com a tag <b>resp</b> e a tag <b>Usuario</b>.<br/> A tag <b>resp</b> informa para o frontend que a requisição deu certo.<br/> A tag <b>Usuario</b> envia os dados do Usuário para serm salvos no banco de dados local do frontend"
                    }
                    */
                }else{
                    return res.status(401).json({ resp: 'n1'}); // #swagger.responses[401]
                }
            }else{
                return res.status(401).json({ resp: 'n2'}); // #swagger.responses[401]

            }
        } catch (error) {
            return res.status(401).json({ resp: 'n3'}); // #swagger.responses[401]
        }

        // #swagger.end
    },


    /*
    *
    *    Cadastro Usuário
    *
    */
    async cadastro(req, res) {

        /* 
            #swagger.tags = ['Usuarios']
            #swagger.description = '<h1>Cadastro do usuário</h1>'
            #swagger.summary = 'Cadastro do usuário'

            #swagger.parameters['obj'] = { 
                in: 'body',
                description: '
                    <h4>Modelo de envio de dados</h4>
                ',
                type: 'object',
                schema: {
                    "gender": "male",
                    "name": {
                        "title": "Mr",
                        "first": "Mariusz",
                        "last": "Mutschler"
                    },
                    "location": {
                        "street": {
                            "number": 3097,
                            "name": "Kapellenweg"
                        },
                        "city": "Oebisfelde-Weferlingen",
                        "state": "Mecklenburg-Vorpommern",
                        "country": "Germany",
                        "postcode": 76750,
                        "coordinates": {
                            "latitude": "-47.5640",
                            "longitude": "-58.7279"
                        },
                        "timezone": {
                            "offset": "+9:00",
                            "description": "Tokyo, Seoul, Osaka, Sapporo, Yakutsk"
                        }
                    },
                    "email": "mariusz.mutschler@example.com",
                    "login": {
                        "uuid": "a9e47a7b-e6d3-4ab1-a784-ecba91113ca1",
                        "username": "orangeelephant909",
                        "password": "jomama",
                        "salt": "3x1mPTeO",
                        "md5": "bff88b88c69be266f6b9b8ca08e96a24",
                        "sha1": "2a02138a346f5d7cd1ae75b1dfccac8b472f8365",
                        "sha256": "ce3cd10b391ce8927da90d01013a439914a6ec45396abd8358fa75d873747d46"
                    },
                    "dob": {
                        "date": "1987-05-05T10:51:21.100Z",
                        "age": 34
                    },
                    "registered": {
                        "date": "2015-04-21T21:12:06.294Z",
                        "age": 6
                    },
                    "phone": "0500-0276076",
                    "cell": "0170-4991621",
                    "_id": {
                        "name": "",
                        "value": null
                    },
                    "picture": {
                        "large": "https://randomuser.me/api/portraits/men/62.jpg",
                        "medium": "https://randomuser.me/api/portraits/med/men/62.jpg",
                        "thumbnail": "https://randomuser.me/api/portraits/thumb/men/62.jpg"
                    },
                    "nat": "DE"
                }
            }    
        */

        const { email } = req.body;
    
        let temUser = 0;

        const verificaEmail = await User.find({ email : email });
        for (var i = 0; i < verificaEmail.length; i++) {
            if(verificaEmail[i].email == email){
                temUser = 1;
                return res.status(401).json({ resp: 'repetido', tipo : 'Email' });
            }
        }

        if(temUser == 1){
            return res.json({ resp: 'repetido' });
        }else{
    
            try{
                await User.create(req.body);

                return res.status(200).json({ resp: 's'});
                /* 
                    #swagger.responses[200] = {
                        description : "Retorna um array com a tag <b>resp</b> e a tag <b>Usuario</b>.<br/> A tag <b>resp</b> informa para o frontend que a requisição deu certo.<br/> A tag <b>Usuario</b> envia os dados do Usuário para serm salvos no banco de dados local do frontend"
                    }
                */
            } catch (error){
                return res.status(404).json({ resp: 'erro' });
                /* 
                    #swagger.responses[404] = {
                        description : "Retorna um array com a tag <b>resp</b> e a tag <b>Usuario</b>.<br/> A tag <b>resp</b> informa para o frontend que a requisição deu certo.<br/> A tag <b>Usuario</b> envia os dados do Usuário para serm salvos no banco de dados local do frontend"
                    }
                */
            }
        }
    },


    /*
    *
    *    Deletar Usuário
    *
    */
    async delete(req, res) {

        /* 
            #swagger.tags = ['Usuarios']
            #swagger.description = '<h1>Remover usuário</h1>'
            #swagger.summary = 'Remover usuário'

            #swagger.parameters['obj'] = { 
                in: 'body',
                description: '
                    <h4>Modelo de envio de dados</h4><br/>
                    <strong>Id</strong> : Id do usuário<br/>
                ',
                type: 'object',
                schema: { 
                    Id   : "6039af4d0ec187e8db6dfebe",
                }
            }    
        */

        try {
            await User.deleteOne({ _id : req.params.userId });
            return res.json({ resp: 's' });
        } catch (error) {
            return res.json({ resp: 'n' });
        }

    },


    /*
    *
    *    Atualizar Usuário
    *
    */
    async update(req, res) {

        /* 
            #swagger.tags = ['Usuarios']
            #swagger.description = '<h1>Atualizar usuário</h1>'
            #swagger.summary = 'Atualizar usuário'

            #swagger.parameters['obj'] = { 
                in: 'body',
                description: '
                    <h4>Modelo de envio de dados</h4><br/>
                    <strong>Id</strong> : Id do usuário<br/>
                ',
                type: 'object',
                schema: {
                    "gender": "male",
                    "name": {
                        "title": "Mr",
                        "first": "Mariusz",
                        "last": "Mutschler"
                    },
                    "location": {
                    "street": {
                        "number": 3097,
                        "name": "Kapellenweg"
                    },
                    "city": "Oebisfelde-Weferlingen",
                    "state": "Mecklenburg-Vorpommern",
                    "country": "Germany",
                    "postcode": 76750,
                    "coordinates": {
                        "latitude": "-47.5640",
                        "longitude": "-58.7279"
                    },
                    "timezone": {
                        "offset": "+9:00",
                        "description": "Tokyo, Seoul, Osaka, Sapporo, Yakutsk"
                    }
                    },
                    "email": "mariusz.mutschler@example.com",
                    "login": {
                        "uuid": "a9e47a7b-e6d3-4ab1-a784-ecba91113ca1",
                        "username": "orangeelephant909",
                        "password": "jomama",
                        "salt": "3x1mPTeO",
                        "md5": "bff88b88c69be266f6b9b8ca08e96a24",
                        "sha1": "2a02138a346f5d7cd1ae75b1dfccac8b472f8365",
                        "sha256": "ce3cd10b391ce8927da90d01013a439914a6ec45396abd8358fa75d873747d46"
                    },
                    "dob": {
                        "date": "1987-05-05T10:51:21.100Z",
                        "age": 34
                    },
                    "registered": {
                        "date": "2015-04-21T21:12:06.294Z",
                        "age": 6
                    },
                    "phone": "0500-0276076",
                    "cell": "0170-4991621",
                    "_id": {
                        "name": "",
                        "value": null
                    },
                    "picture": {
                        "large": "https://randomuser.me/api/portraits/men/62.jpg",
                        "medium": "https://randomuser.me/api/portraits/med/men/62.jpg",
                        "thumbnail": "https://randomuser.me/api/portraits/thumb/men/62.jpg"
                    },
                    "nat": "DE"
                }
            }    
        */


        const { 
            gender,
            nameTitle,
            nameFirst,
            nameLast,
            locationStreetNumber,
            locationStreetName,
            locationCity,
            locationState,
            locationCountry,
            locationPostcode,
            locationCoordinatesLatitude,
            locationCoordinatesLongitude,
            locationTimezoneOffset,
            locationTimezoneDescription,
            email,
            loginUsername,
            loginPassword,
            dobDate,
            dobAge,
            registeredDate,
            registeredAge,
            phone,
            cell,
            pictureLarge,
            pictureMedium,
            pictureThumbnail,
            nat
        } = req.body;

        const user = await User.findById(req.params.userId);
        if(user.name.first != undefined){
            
            user.gender = (gender != undefined) ? gender : user.gender;
            user.name.title = (nameTitle != undefined) ? nameTitle : user.name.title;
            user.name.first = (nameFirst != undefined) ? nameFirst : user.name.first;
            user.name.last = (nameLast != undefined) ? nameLast : user.name.last;
            user.location.street.number = (locationStreetNumber != undefined) ? locationStreetNumber : user.location.street.number;
            user.location.street.nname = (locationStreetName != undefined) ? locationStreetName : user.location.street.name;
            user.location.city = (locationCity != undefined) ? locationCity : user.location.city;
            user.location.state = (locationState != undefined) ? locationState : user.location.city;
            user.location.country = (locationCountry != undefined) ? locationCountry : user.location.country;
            user.location.postcode = (locationPostcode != undefined) ? locationPostcode : user.location.postcode;
            user.location.coordinates.latitude = (locationCoordinatesLatitude != undefined) ? locationCoordinatesLatitude : user.location.coordinates.latitude;
            user.location.coordinates.longitude = (locationCoordinatesLongitude != undefined) ? locationCoordinatesLongitude : user.location.coordinates.longitude;
            user.location.timezone.offset = (locationTimezoneOffset != undefined) ? locationTimezoneOffset : user.location.timezone.offset;
            user.location.timezone.description = (locationTimezoneDescription != undefined) ? locationTimezoneDescription : user.location.timezone.description;
            user.email = (email != undefined) ? email : user.email;
            user.login.username = (loginUsername != undefined) ? loginUsername : user.login.username;

            if(loginPassword != undefined){

                user.login.password = loginPassword;

                const salt          = crypto.pbkdf2Sync(new Date().getTime().toString(), 'salt', 100000, 64, 'salt');
                const md5           = crypto.pbkdf2Sync(new Date().getTime().toString(), 'salt', 100000, 64, 'md5');
                const sha1          = crypto.pbkdf2Sync(new Date().getTime().toString(), 'salt', 100000, 64, 'sha1');
                const sha256        = crypto.pbkdf2Sync(new Date().getTime().toString(), 'salt', 100000, 64, 'sha256');
                //usuario[0].Token = to.toString('hex');

                user.login.salt     = salt;
                user.login.md5      = md5;
                user.login.sha1     = sha1;
                user.login.sha256   = sha256;

            }
            

            user.dob.date = (dobDate != undefined) ? dobDate : user.location.city;
            user.dob.age = (dobAge != undefined) ? dobAge : user.location.city;
            user.registered.date = (registeredDate != undefined) ? registeredDate : user.location.city;
            user.registered.age = (registeredAge != undefined) ? registeredAge : user.location.city;
            user.phone = (phone != undefined) ? phone : user.location.city;
            user.cell = (cell != undefined) ? cell : user.location.city;
            user.picture.large = (pictureLarge != undefined) ? pictureLarge : user.location.city;
            user.picture.medium = (pictureMedium != undefined) ? pictureMedium : user.location.city;
            user.picture.thumbnail = (pictureThumbnail != undefined) ? pictureThumbnail : user.location.city;
            user.nat = (nat != undefined) ? nat : user.location.city;
            

            try {
                await user.save();
                return res.status(200).json({ resp: 's' });    
            } catch (error) {
                return res.status(400).json({ resp: 'n1' });
            }
        }else{
            return res.status(400).json({ resp: 'n2' });
        }
        

    },


    /*
    *
    *    Ver Usuário
    *
    */
    async view(req, res) {

        /* 
            #swagger.tags = ['Usuarios']
            #swagger.description = '<h1>Detalhes do usuário</h1>'
            #swagger.summary = 'Detalhes do usuário'

            #swagger.parameters['obj'] = { 
                in: 'body',
                description: '
                    <h4>Modelo de envio de dados</h4><br/>
                    <strong>Id</strong> : Id do usuário<br/>
                ',
                type: 'object',
                schema: { 
                    Id   : "6039af4d0ec187e8db6dfebe",
                }
            }    
        */

        try {
            const user = await User.findById(req.params.userId);
            return res.status(200).json({ resp: 's', user });    
        } catch (error) {
            return res.status(400).json({ resp: 'n' });
        }

    },


    /*
    *
    *    Listar Usuários
    *
    */
    async list(req, res) {

        /* 
            #swagger.tags = ['Usuarios']
            #swagger.description = '<h1>Listar usuário</h1>s'
            #swagger.summary = 'Listar usuários'

            #swagger.parameters['obj'] = { 
                in: 'body',
                description: '
                    <h4>Modelo de envio de dados</h4><br/>
                    Não é nescessário passar parâmetros para essa rota
                ',
                type: 'object',
                schema: {}
            }    
        */

       try {
            const user = await User.find();
            return res.status(200).json({ resp: 's', user });    
        } catch (error) {
            return res.status(400).json({ resp: 'n' });
        }

    },




};



