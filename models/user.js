const { Schema, model } = require('mongoose');

const userSchema = Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        emil: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Email address does not match'], 
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },{
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;