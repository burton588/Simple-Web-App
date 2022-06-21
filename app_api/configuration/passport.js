const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(
    new LocalStrategy(
      {
        usernameField: 'userName',
        passwordField: 'password'
      },
      (userName, password, pkKoncano) => {
        console.log(userName, password)
        User.findOne(
          { userName: userName },
          (error, user) => {
            if (error)
              return pkKoncano(error);
            if (!user) {
              return pkKoncano(null, false, {
                "message": "Wrong username or password!"
              });
            }
            if (!user.checkPassword(password)) {
              return pkKoncano(null, false, {
                "message": "Wrong username or password!"
              });
            }
            return pkKoncano(null, user);
          }
        );
      }
    )
  );