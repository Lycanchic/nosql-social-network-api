const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thought-controller');

// To get a thought (all)
router.get('/', getThoughts);

// To get a thought by id (single)
router.get('/:thoughtId', getSingleThought);

// To create a thought
router.post('/', createThought);

// To update a thought by id
router.put('/:thoughtId', updateThought);

// To delete a thought by id
router.delete('/:thoughtId', deleteThought);

// To post a reaction to a thought
router.post('/:thoughtId/reaction', addReaction);

// To delete a reaction from a thought
router.delete('/:thoughtId/reactions/:reactionId', removeReaction);

module.exports = router;
