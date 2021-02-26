
const mongoose   = require('mongoose');
var crypto = require('crypto')
    , rash = crypto.createHash('sha1');
const User       = mongoose.model('User');


module.exports = {

    
    async login(req, res) {    
        /* 
            #swagger.tags = ['Usuarios']
            #swagger.description = 'Login do usuário'


            #swagger.parameters['obj'] = { 
                in: 'body',
                description: '
                    <h3>Modelo de envio de dados para esse endpoint</h3><br/>
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


        console.log(req.body);

        const { Email, Senha } = req.body;

        const key = crypto.pbkdf2Sync(Senha, 'salt', 100000, 64, 'sha512');
        const Rash = key.toString('hex');

        try {
            const usuario = await User.find({ Rash : Rash, Email : Email });
            console.log(usuario);
            return res.json({ resp: 's', Usuario: usuario[0]  }); 
            /* #swagger.responses[200] = {
                description : "Retorna um array com a tag <b>resp</b> e a tag <b>Usuario</b>.<br/> A tag <b>resp</b> informa para o frontend que a requisição deu certo.<br/> A tag <b>Usuario</b> envia os dados do Usuário para serm salvos no banco de dados local do frontend"
            }
            */
        } catch (error) {
            return res.json({ resp: 'n'}); // #swagger.responses[404]
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
            #swagger.description = 'Cadastro do usuário'

            #swagger.parameters['obj'] = { 
                in: 'body',
                description: '
                    <h3>Modelo de envio de dados para esse endpoint</h3><br/>
                    <strong>Nome</strong> : Nome do usuário<br/>
                    <strong>E-mail</strong> : Email do usuário<br/>
                    <strong>Senha</strong> : Senha do usuário<br/>
                    <strong>CPF</strong> : CPF do usuário<br/>
                    <strong>Perfil</strong> : Perfil do usuário<br/>
                    <strong>Telefone</strong> : Telefone do usuário
                ',
                type: 'object',
                schema: { 
                    Nome   : "João Doria",
                    Email  : "Joao@Doria.com",
                    Senha  : "JoaoDoria123",
                    CPF    : "123.456.789-00",
                    Perfil : 1,
                    Phone  : "(00) 00000-0000",
                }
            }    
        */


        console.log(req.body);

        const { Nome, Email, Senha, CPF, Perfil, Phone } = req.body;

        console.log(Nome);
    
        let temUser = 0;

        const verificaEmail = await User.find({ Email : Email });
        for (var i = 0; i < verificaEmail.length; i++) {
            if(verificaEmail[i].Email == Email){
                temUser = 1;
                return res.json({ resp: 'repetido', tipo : 'Email' });
            }
        }

        const verificaCPF = await User.find({ CPF : CPF });
        for (var i = 0; i < verificaCPF.length; i++) {
            if(verificaCPF[i].CPF == CPF){
                temUser = 1;
                return res.json({ resp: 'repetido', tipo : 'CPF' });
            }
        }
        

        if(temUser == 1){
            return res.json({ resp: 'repetido' });
        }else{
    
            const key = crypto.pbkdf2Sync(Senha, 'salt', 100000, 64, 'sha512');
            const Rash = key.toString('hex');

            let file = '';
            try {
                file = req.file.filename;
            } catch (error) {
                file = '';
            }

            try{
                await User.create({
                    Nome    : Nome,
                    Email   : Email,
                    Rash    : Rash,
                    Avatar  : file,
                    Premmy  : 0,
                    Status  : 1,
                    CPF     : CPF,
                    Perfil  : Perfil,
                    Telefone : Phone
                });

                return res.json({ resp: 's'});
                /* 
                    #swagger.responses[200] = {
                        description : "Retorna um array com a tag <b>resp</b> e a tag <b>Usuario</b>.<br/> A tag <b>resp</b> informa para o frontend que a requisição deu certo.<br/> A tag <b>Usuario</b> envia os dados do Usuário para serm salvos no banco de dados local do frontend"
                    }
                */
            } catch (error){
                return res.json({ resp: 'erro' });
                /* 
                    #swagger.responses[404] = {
                        description : "Retorna um array com a tag <b>resp</b> e a tag <b>Usuario</b>.<br/> A tag <b>resp</b> informa para o frontend que a requisição deu certo.<br/> A tag <b>Usuario</b> envia os dados do Usuário para serm salvos no banco de dados local do frontend"
                    }
                */
            }
        }
    },



};



