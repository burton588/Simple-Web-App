const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');



const register = (req, res) => {
    if (!req.body.userName || !req.body.password) {
      return res.status(400).json({"message": "all info is required"});
    }
    const user = new User();
    user.userName = req.body.userName;
    user.setPassword(req.body.password);
    console.log("smo tu not");
    user.save(error => {
      if (error) {
        if (error.name == "ValidationError") {
            res.status(409).json({"message": "User with that username is already registered."});
          } else {
            res.status(500).json(error);
          }
      } else {
        res.status(200).json({"token": user.generateJwt()});
      }
    });
  };

  const login = (req, res) => {
    if (!req.body.userName || !req.body.password) {
      return res.status(400).json({"message": "all data is required"});
    }
    passport.authenticate('local', (error, user, info) => {
      if (error)
        return res.status(500).json(error);
      if (user) {
        res.status(200).json({"token": user.generateJwt()});
      } else {
        res.status(401).json(info);
      }
    })(req, res);
  };
  
  module.exports = {
    register,
    login
  };