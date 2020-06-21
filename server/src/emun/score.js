const mongoose = require('mongoose');

const scoreSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.ObjectId
    },
    point: {
      type: Number
    }
  },
  {
    collection: 'score'
  }
);

const Score = mongoose.model('score', scoreSchema);
module.exports = Score;
