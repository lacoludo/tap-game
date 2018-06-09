import mongoose from "mongoose";
const User = mongoose.model("User");

export const profileRead = (req, res) => {
  if (!req.payload._id) {
    res.status(401).json({
      message: "UnauthorizedError: private profile"
    });
  } else {
    User.findById(req.payload._id).exec((err, user) => {
      res.status(200).json(user);
    });
  }
};
