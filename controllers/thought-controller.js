const { thought, user } = require("../models");

const thoughtController = {
  // get thoughts (all)
  async getThoughts(req, res) {
    // Try to get all thoughts from database and sort them by createdAt
    try {
      const dbThoughtData = await thought.find().sort({ createdAt: -1 });
      res.json(dbThoughtData);
    } catch (err) {
      // If there's an error, log it and send a 500 error response
      console.log(err);
      res.status(500).json(err);
    }
  },
  // get thought (single)
  async getSingleThought(req, res) {
    // Try to get a single thought from database by id
    try {
      const dbThoughtData = await thought.findOne({
        _id: req.params.thoughtId,
      });
      // If no thought is found, send a 404 response with a message
      if (!dbThoughtData) {
        return res.status(404).json({ message: "No thought with this id" });
      }
      res.json(dbThoughtData);
    } catch (err) {
      // If there's an error, log it and send a 500 error response
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Create a new thought
  async createThought(req, res) {
    // Try to create a new thought and update the user's thoughts array with the thought's id
    try {
      const dbThoughtData = await thought.create(req.body);
      const dbUserData = await user.findOneAndUpdate(
        { username: req.body.username },
        { $push: { thoughts: dbThoughtData._id } },
        { new: true }
      );
      // If no user is found, send a 404 response with a message
      if (!dbUserData) {
        return res
          .status(404)
          .json({ message: "Thought created, no user with this id" });
      }

      res.json({ message: "Thought successfully created" });
    } catch (err) {
      // If there's an error, log it and send a 500 error response
      console.log(err);
      res.status(500).json(err);
    }
  },
  // update a thought
  updateThought(req, res) {
    // Try to find and update a thought by id
    thought
      .findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
      .then((thoughtData) => {
        // If no thought is found, send a 404 response with a message
        if (!thoughtData) {
          return res.status(404).json({ message: "No thought with user id" });
        }
        res.json(thoughtData);
      })
      .catch((err) => {
        // If there's an error, log it and send a 500 error response
        console.log(err);
        res.status(500).json(err);
      });
  },
  // delete a thought
  deleteThought(req, res) {
    // Try to find and delete a thought by id, then remove it from the user's thoughts array
    thought
      .findOneAndDelete({ _id: req.params.thoughtId })
      .then((thoughtData) => {
        // If no thought is found, send a 404 response with a message
        if (!thoughtData) {
          return res
            .status(404)
            .json({ message: "No thought associated with this user id" });
        }

        // Remove thought ID from user's thoughts array
        return user.findOneAndUpdate(
          // Find user with matching username
          { username: thoughtData.username },
          // Remove thought ID from user's thoughts array
          { $pull: { thoughts: req.params.thoughtId } },
          // Return updated user data
          { new: true }
        );
      })
      .then((userData) => {
        if (!userData) {
          return res
            .status(404)
            .json({
              message: "Thought created. Unable to locate a user with this id",
            });
        }
        res.json({ message: "Thought successfully deleted" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //add a reaction to a thought
  addReaction(req, res) {
    thought
      .findOneAndUpdate(
        // Find thought with matching ID
        { _id: req.params.thoughtId },
        // Add reaction to thought's reactions array
        { $push: { reactions: req.body } },
        // Validate and return updated thought data
        { runValidators: true, new: true }
      )
      // When thought data is updated...
      .then((thoughtData) => {
        // If thought data is not found...
        if (!thoughtData) {
          return res
            .status(404)
            .json({ message: "No thought found with this id" });
        }
        // Otherwise, return updated thought data
        res.json(thoughtData);
      })
      // If there's an error log the error and return the error message
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // remove reaction from thought
  removeReaction(req, res) {
    try {
      const thoughtData = thought.findOneAndUpdate(
        // Find the thought with matching ID
        { _id: req.params.thoughtId },
        // Remove the reaction with matching reaction ID from the thought's reactions array
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        // Validate and return updated thought data
        { runValidators: true, new: true }
      );
      // If the thought data is not found...
      if (!thoughtData) {
        return res
          .status(404)
          .json({ message: "No thought associated with this id" });
      }
      // Return error message
      res.json(thoughtData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};

module.exports = thoughtController;
