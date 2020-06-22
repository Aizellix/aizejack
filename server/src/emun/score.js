const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('./user');

const scoreSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.ObjectId
    },
    point: {
      type: Number
    },
    user: { type: Schema.Types.ObjectId, ref: User }
  },
  {
    collection: 'score'
  }
);

const Score = mongoose.model('score', scoreSchema);
module.exports = Score;
