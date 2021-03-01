const mongoose = require('mongoose');

const UserScheema = new mongoose.Schema({
    "gender": String,
    "name": {
      "title": String,
      "first": String,
      "last": String
    },
    "location": {
      "street": {
        "number": String,
        "name": String
      },
      "city": String,
      "state": String,
      "postcode": String,
      "coordinates": {
        "latitude": String,
        "longitude": String
      },
      "timezone": {
        "offset": String,
        "description": String
      }
    },
    "email": String,
    "login": {
      "uuid": String,
      "username": String,
      "password": String,
      "salt": String,
      "md5": String,
      "sha1": String,
      "sha256": String
    },
    "dob": {
      "date": String,
      "age": String
    },
    "registered": {
      "date": String,
      "age": String
    },
    "phone": String,
    "cell": String,
    "userId": {
      "name": String,
      "value": String
    },
    "picture": {
      "large": String,
      "medium": String,
      "thumbnail": String
    },
    "nat": String,
    "Token":String
  }
  ,{
    timestamps: true
});

module.exports = mongoose.model('Usern', UserScheema);
