import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

mongoose.model("Game", gameSchema);
