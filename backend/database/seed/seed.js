const crypto        = require('crypto');
const mongoose      = require("mongoose");
const requireDir    = require('require-dir');
const env           = require('dotenv/config');
const fetch         = require('node-fetch');


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


    fetch('https://randomuser.me/api/?results=500', {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(async json => {

        for (let u = 0; u <= json.results.length; u++) {
            try {

                await Usern.create(json.results[u]);
                
            } catch (error) {
                console.log('Erro ao salvar');
                return false;
            }   
        }

        console.log('Seed concluído');
        return true;

    });

  });
