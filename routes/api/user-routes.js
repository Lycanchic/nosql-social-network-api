const router = require('express').Router();
const {
    getUser,
    getSingleUser,
    createUser,
    updateUser,
    delteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/user-controller');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/frineds/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
