import express from "express";
const router = express.Router();
import jwt from "express-jwt";
const auth = jwt({
  secret: "MY_SECRET",
  userProperty: "payload"
});

const ctrlProfile = require("./../controllers/profile");
const ctrlAuth = require("./../controllers/authentication");
var ctrlGame = require("./../controllers/game");

router.get("/profile", auth, ctrlProfile.profileRead);

router.post("/register", ctrlAuth.register);
router.post("/login", ctrlAuth.login);

router.post("/savescore", ctrlGame.saveScore);
router.get("/getscores", ctrlGame.getScores);

module.exports = router;
