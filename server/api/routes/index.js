import express from "express";
const router = express.Router();
import jwt from "express-jwt";
const auth = jwt({
  secret: "MY_SECRET",
  userProperty: "payload"
});

const ctrlProfile = require("./../controllers/profile");
const ctrlAuth = require("./../controllers/authentication");

// profile
router.get("/profile", auth, ctrlProfile.profileRead);

// authentication
router.post("/register", ctrlAuth.register);
router.post("/login", ctrlAuth.login);

module.exports = router;
