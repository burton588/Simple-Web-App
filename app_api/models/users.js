const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
var uniqueValidator = require('mongoose-unique-validator')



const usersSchema = new mongoose.Schema({
    userName: {type: String, required: true},
    hashValue: {type: String, required: true},
    randomValue: {type: String, required: true},
    
});

usersSchema.methods.setPassword = function(password) {
    this.randomValue = crypto.randomBytes(16).toString('hex');
    this.hashValue = crypto
      .pbkdf2Sync(password, this.randomValue, 1000, 64, 'sha512')
      .toString('hex');
  };

  usersSchema.methods.checkPassword = function(password) {
    let hashValue = crypto
      .pbkdf2Sync(password, this.randomValue, 1000, 64, 'sha512')
      .toString('hex');
    return this.hashValue == hashValue;
  };

  usersSchema.methods.generateJwt = function() {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);
  
    return jwt.sign({
      _id: this._id,
      userName: this.userName,
      exp: parseInt(expirationDate.getTime() / 1000, 10)
    }, "secret");
  };
  
  usersSchema.plugin(uniqueValidator)
  mongoose.model('User',usersSchema, 'Users');


