import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import mongoose from "mongoose";
const User = mongoose.model("User");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email"
    },
    (username, password, done) => {
      User.findOne({ email: username }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            message: "User not found"
          });
        }
        if (!user.validPassword(password)) {
          return done(null, false, {
            message: "Password is wrong"
          });
        }
        return done(null, user);
      });
    }
  )
);
