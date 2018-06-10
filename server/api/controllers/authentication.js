import passport from "passport";
import mongoose from "mongoose";
const User = mongoose.model("User");

const sendJSONresponse = (res, status, content) => {
  res.status(status);
  res.json(content);
};

export const register = (req, res) => {
  if (
    !req.body.firstname ||
    !req.body.lastname ||
    !req.body.email ||
    !req.body.password
  ) {
    sendJSONresponse(res, 400, {
      message: "All fields required"
    });
    return;
  }

  const user = new User();

  user.firstname = req.body.firstname;
  user.lastname = req.body.lastname;
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
  passport.authenticate("local", (err, user, info) => {
    let token;

    if (err) {
      res.status(404).json(err);
      return;
    }

    if (user) {
      token = user.generateJwt();
      res.status(200);
      res.json({
        token: token
      });
    } else {
      res.status(401).json(info);
    }
  })(req, res);
};
