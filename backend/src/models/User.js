const mongoose = require('mongoose');

const UserScheema = new mongoose.Schema({
    Nome       : String,
    Email      : String,
    Rash       : String,
    Avatar     : String,
    CPF        : String,
    Telefone   : String,
    Perfil     : String
},{
    timestamps: true
});

module.exports = mongoose.model('User', UserScheema);
