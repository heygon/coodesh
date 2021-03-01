const request  = require('supertest');
const mongoose = require('mongoose');
const env      = require('dotenv/config');

const app     = require('../../src/app');
const api     = request(app);

mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true ,
  useUnifiedTopology: true,
  useFindAndModify : false,
  useCreateIndex : true
});


let user = {
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
    "id": {
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
let dados = '';

describe('Ações do usuário antes da autenticação', function() {
    
    it('Cadastro', async function(done) {
        api.post('/users/cadastro')
        .send(user)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            
            let data = JSON.parse(res.text);
            if(data.resp == 's'){
                return done();
            }else{
                return done(err);
            }

        });
    });
    

    it('Login', async function(done) {
        api.post('/users/login')
        .send({
            Email : user.email,
            Senha : user.login.password,
        })
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);

            let data = JSON.parse(res.text);
            if(data.resp == 's' && data.Usuario.name.first != undefined){

                user.userId = data.Usuario._id;
                user.Token = data.Usuario.Token;
                
                setTimeout(function(){
                  return done();
                },2000);
                

            }else{
                return done(err);
            }
            
        });
    });


    it('Update', async function(done) {
      setTimeout(function(){
        api.put('/users/'+user.userId)
        .set('Accept', 'application/json')
        .send({
          nameFirst : '3',
          nameLast : '3',
          email : '3',
          gender : '3',
          dobDate : '3',
          phone : '3',
          nat : '3',
          locationStreetNumber : '3',
          locationStreetName : '3',
          locationCity : '3',
          locationState : '3',
          locationCountry : '3',
          locationPostcode : '3',
          Token : user.Token
        })
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            
            let data = JSON.parse(res.text);
            if(data.resp == 's'){
                return done();
            }else{
                return done(err);
            }

        });
      },2000);
    });


    it('View', async function(done) {
      setTimeout(function(){
        api.get('/users/'+user.userId)
        .set('Accept', 'application/json')
        .send({
          Token : user.Token
        })
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            
            let data = JSON.parse(res.text);
            if(data.resp == 's'){
                return done();
            }else{
                return done(err);
            }

        });
      },2000);
    });


    it('View All', async function(done) {
      setTimeout(function(){
        api.get('/users')
        .set('Accept', 'application/json')
        .send({
          Token : user.Token
        })
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            
            let data = JSON.parse(res.text);
            if(data.resp == 's'){
                return done();
            }else{
                return done(err);
            }

        });
      },2000);
    });


    it('Delete', async function(done) {
      setTimeout(function(){

        api.delete('/users/'+user.userId)
        .set('Accept', 'application/json')
        .send({
          Token : user.Token
        })
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            
            let data = JSON.parse(res.text);
            if(data.resp == 's'){
                return done();
            }else{
                return done(err);
            }

        });
      },2000);
    });

});

