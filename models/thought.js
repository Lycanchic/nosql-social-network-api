const mongoose = require('mongoose');
const reactionSchema = require('./reaction');
const dateFormat = require('../utils/dateFormat');

const Thought = mongoose.Schema({
  thoughtText: {
    type: String,
    required: 'A thought is required',
    minlength: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
}, {
  toJSON: {
    getters: true,
  },
  id: false,
});

Thought.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

module.exports = mongoose.model('Thought', Thought);
