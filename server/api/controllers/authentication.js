import passport from "passport";
import mongoose from "mongoose";
const User = mongoose.model("User");

const sendJSONresponse = (res, status, content) => {
  res.status(status);
  res.json(content);
};

export const register = (req, res) => {
  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  const user = new User();

  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  user.save(err => {
    let token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      token: token
    });
  });
};

export const login = (req, res) => {
  // if(!req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  passport.authenticate("local", (err, user, info) => {
    let token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if (user) {
      token = user.generateJwt();
      res.status(200);
      res.json({
        token: token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
};
