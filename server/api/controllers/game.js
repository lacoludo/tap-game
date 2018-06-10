import mongoose from "mongoose";
const Game = mongoose.model("Game");
const User = mongoose.model("User");

const sendJSONresponse = (res, status, content) => {
  res.status(status);
  res.json(content);
};

export const saveScore = (req, res) => {
  if (!req.body.email || !req.body.points) {
    sendJSONresponse(res, 400, {
      message: "All fields required"
    });
    return;
  }
  const game = new Game();
  game.score = req.body.points;
  game.user = req.body.email;
  game.date = new Date();
  game.save(err => {
    res.status(200);
    res.json({
      game: game
    });
  });
};

export const getScores = (req, res) => {
  const allScores = [];
  game
    .find()
    .exec((err, scores) => {
      scores.map(score => {
        User.findOne({ email: score.user }, (err, user) => {
          allScores.push({
            date: score.date,
            score: score.score,
            user: {
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email
            }
          });
          if (allScores.length === scores.length) {
            res.status(200);
            res.json(allScores);
          }
        });
      });
    });
};
