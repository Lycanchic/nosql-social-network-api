const { Schema, model } = require('mongoose');

class User {
  constructor() {
    const userSchema = new Schema(
      {
        username: {
          type: String,
          required: true,
          unique: true,
          trim: true,
        },
        email: {
          type: String,
          required: true,
          unique: true,
          match: [/.+@.+\..+/, 'Email address does not match'],
        },
        thoughts: [
          {
            type: Schema.Types.ObjectId,
            ref: 'thought',
          },
        ],
        friends: [
          {
            type: Schema.Types.ObjectId,
            ref: 'user',
          },
        ],
      },
      {
        toJSON: {
          virtuals: true,
        },
        id: false,
      }
    );

    userSchema.virtual('friendCount').get(function () {
      return this.friends.length;
    });

    return model('user', userSchema);
  }
}

module.exports = new User();
