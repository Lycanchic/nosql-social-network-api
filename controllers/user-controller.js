const { user, thought } = require("../models");

const userController = {
  //get all users
  async getUsers(req, res) {
    try {
      // Find all users and exclude "__v" field
      const UserData = await user.find().select("-__v");
      // Return user data as JSON
      res.json(UserData);
      // If there's an error
    } catch (err) {
      // Log the error
      console.log(err);
      // Return error message
      res.status(500).json(err);
    }
  },

  // To get single user by id
  async getSingleUser(req, res) {
    try {
      // Find the user in the database using their id and populate their friends and thoughts
      const UserData = await user
        .findOne({ _id: req.params.userId })
        .select("-__v")
        .populate("friends")
        .populate("thoughts");
      // If no user is found, return an error message with a status of 404
      if (!UserData) {
        return res.status(404).json({ message: "No user with this id" });
      }

      // If the user is found, return their data
      res.json(UserData);
    } catch (err) {
      // If there is an error, log it to the console and return an error message with a status of 500
      console.log(err);
      res.status(500).json(err);
    }
  },

  // To create a new user
  async createUser(req, res) {
    try {
      // Create a new user using the data in the request body
      const UserData = await user.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      // If there is an error, log it to the console and return an error message with a status of 500
      console.log(err);
      res.status(500).json(err);
    }
  },

  // To update a user
  async updateUser(req, res) {
    try {
      // Find the user in the database by their id and update their data with the data in the request body
      const UserData = await user.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        {
          // This option makes sure that the updated data passes all of the model's validation rules
          runValidators: true,
          // This option tells mongoose to return the updated
          new: true,
        }
      );

      if (!UserData) {
        return res.status(404).json({ message: "No user with this id" });
      }
      res.json(UserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Delete user and all associated thoughts)
  async deleteUser(req, res) {
    try {
      const UserData = await user.findOneAndDelete({ _id: req.params.userId });
      if (!UserData) {
        return res.status(404).json({ message: "No user data with this id" });
      }

      //delete all user thoughts
      await thought.deleteMany({ _id: { $in: UserData.thoughts } });
      res.json({ message: "User and associated thought deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Edit friedns's list, add a friend
  async addFriend(req, res) {
    try {
      const UserData = await user.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      if (!UserData) {
        return res.status(404).json({ message: "No user data with this id" });
      }
      res.json(UserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Edit friend's list, remove a friend
  async removeFriend(req, res) {
    try {
      const UserData = await user.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!UserData) {
        return res.status(404).json({ message: "No user data with this id" });
      }
      res.json(UserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
