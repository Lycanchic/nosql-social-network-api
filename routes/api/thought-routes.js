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

//api thoughts
router.route('/').get(getThoughts).post(createThought);

// /apithought/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// api/thoughts/:thoughtId/reactions
router.rooute('/:thoughtId/reactions').post(addReaction);

// api/thought/:thoughtId/reactions
router.route('/:thoughtId/reaction').post(addReaction);

//api/tjhoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
