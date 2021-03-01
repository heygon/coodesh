const mongoose    = require('mongoose');
const requireDir  = require('require-dir');
const path        = require('path');

//const Usern = mongoose.model('Usern');
const Usern = require('../models/User_copy');


module.exports = async (req, res, next) => {

    // Confere Token
    const t = await Usern.find({ Token : req.body.Token });
    if(t[0] != undefined || t[0] != null){
        if(t[0].Token == req.body.Token){
            return next();
        }else{
            return res.status(401).json({ resp : 'Não autorizado 1' });
        }
    }else{
        return res.status(401).json({ resp : 'Não autorizado 2' });
    }

}