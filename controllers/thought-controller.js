const { thought, user } = require('../models');

const thoughtController = {
  // get all thoughts
  async getThoughts(req, res) {
    try {
      const dbThoughtData = await thought.find().sort({ createdAt: -1 });
      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
      };
  },
  // get a single thought
  async getSingleThought(req, res) {
    try {
      const dbThoughtData = await thought.findOne({ _id: req.params.thoughtId });
      if (!dbThoughtData) {
        return res.status(404).json({ message: "No thought with this id" });
      }
      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    };
  },
  // Create a thought
  async createThought(req, res) {
    try {
      const dbThoughtData = await thought.create(req.body);
      const dbUserData = await user.findOneAndUpdate(
        { username: req.body.username },
        { $push: { thoughts: dbThoughtData._id } },
        { new: true }
      );

      if (!dbUserData) {
        return res.status(404).json({ message: "Thought created, no user with this id" });
      }

      res.json({ message: "Thought successfully created" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
      };
  },
  // update thought
  updateThought(req, res) {
    thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
      )
      .then((thoughtData) => {
        if (!thoughtData) {
          return res.status(404).json({ message: "No thought with user id" });
        }
        res.json(thoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // delete thought
  deleteThought(req, res) {
    thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thoughtData) => {
        if (!thoughtData) {
          return res.status(404).json({ message: "No thought associated with this user id" });
        }

        // remove thought id and thought Id
        return user.findOneAndUpdate(
          {  username: thoughtData.username },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
      })
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: "Thought created. Unable to locate a user with this id" });
        }
        res.json({ message: 'Thought successfully deleted' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //add a reaction to a thought
  addReaction(req, res) {
    thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thoughtData) => {
        if (!thoughtData) {
          return res.status(404).json({ message: "No thought found with this id" });
        }
        res.json(thoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // remove reaction from thought
   removeReaction(req, res) {
    try {
      const thoughtData = thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      if (!thoughtData) {
        return res.status(404).json({ message: "No thought associated with this id" });
      }
      res.json(thoughtData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }
  };


module.exports = thoughtController;
