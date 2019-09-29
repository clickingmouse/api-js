const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const User = require("../models/user-model");

passport.use(
  new GoogleStrategy(
    {
      //options for google stradegy

      //goes from root
      callbackURL: "/auth/google/redirect",
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret
    },
    (accessToken, refreshToken, profile, done) => {
      //passport callback function
      console.log("passport callback func fired");
      console.log(profile);
      //check if user already exists
      User.findOne({ googleId: profile.id }).then(currentUser => {
        if (currentUser) {
          //already have the user
          console.log("users is", currentUser);
        } else {
          //if not create user in db
          new User({
            username: profile.displayName,
            googleId: profile.id
          })
            .save()
            .then(newUser => {
              console.log("new user created:" + newUser);
            });
        }
      });

      // new User({
      //   username: profile.displayName,
      //   googleId: profile.id
      // })
      //   .save()
      //   .then(newUser => {
      //     console.log("new user created:" + newUser);
      //   });
    }
  )
);
