const crypto        = require('crypto');
const mongoose      = require("mongoose");
const requireDir    = require('require-dir');
const env           = require('dotenv/config');


//Carrega todos os models e deixa úblico
requireDir('../../src/models');

const Usern = mongoose.model('Usern');


//connect mongoose
mongoose
  .connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(err => {
    console.log(err.stack);
    process.exit(1);
  })
  .then(async () => {

    try {
        await Usern.create({
            "gender": "1",
            "name": {
            "title": "1",
            "first": "1",
            "last": "1"
            },
            "location": {
            "street": {
                "number": "1",
                "name": "1"
            },
            "city": "1",
            "state": "1",
            "postcode": "1",
            "coordinates": {
                "latitude": "1",
                "longitude": "1"
            },
            "timezone": {
                "offset": "1",
                "description": "1"
            }
            },
            "email": "1",
            "login": {
            "uuid": "1",
            "username": "1",
            "password": "1",
            "salt": "1",
            "md5": "1",
            "sha1": "1",
            "sha256": "1"
            },
            "dob": {
            "date": "1",
            "age": "1"
            },
            "registered": {
            "date": "1",
            "age": "1"
            },
            "phone": "1",
            "cell": "1",
            "userId": {
            "name": "1",
            "value": "1"
            },
            "picture": {
            "large": "1",
            "medium": "1",
            "thumbnail": "1"
            },
            "nat": "1"
        });

        console.log('Depois do salvar');
        return true;
        
    } catch (error) {
        console.log('Erro ao salvar');
        return false;
    }


  });
