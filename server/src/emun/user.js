const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      default: 'anonymous'
    },
    coins: {
      type: Number,
      default: 1000
    },
    dealerCards: {
      type: Array,
      default: []
    },
    deck: {
      type: Array,
      default: Array.from(Array(104).keys())
    },
    createdTime: {
      type: Date,
      default: Date.now
    }
  },
  {
    collection: 'user'
  }
);

const User = mongoose.model('user', userSchema);
module.exports = User;
