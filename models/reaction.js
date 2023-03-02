const { Schema, Types, models } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// This code creates an instance of the express.js router and sets up routes for handling requests related to user data.
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports =  reactionSchema;
