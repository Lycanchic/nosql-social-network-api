const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/user-controller');

// Define routes for handling user operations
// Get all users
router.get('/users', getUsers);

// To get a single user
router.get('/users/:userId', getSingleUser); 

//To create a new user
router.post('/users', createUser);

// To update a user
router.put('/users/:userId', updateUser);

// To delete a user
router.delete('/users/:userId', deleteUser);

// Define routes for handling friend operations for a user

// ADD a friend to a user's friend list
router.post('/users/:userId/friends/:friendId', addFriend);

// REMOVE a friend from a user's friend list
router.delete('/users/:userId/friends/:friendId', removeFriend);

module.exports = router;
