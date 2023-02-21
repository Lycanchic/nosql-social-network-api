const { user, thought } = require('../models');

const userController = {
    //get all users
    getUsers(req, res) {
        user.find()
        .select('-__v')
        .then((dbUserData) => {
           res.json(dbUserData); 
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // get single user by id
    getSingleUser(req, res) {
        user.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('friends')
        .populate('thoughts')
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user with this id'});
            }
            res,json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    //create a new user
    createUser(req, res) {
        user.create(req.body)
        .then((dbUserData) => {
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // update a user
    updateUser(req, res) {
        user.findOneAndUpdate(
            { _id: req.params.userId },
            {
              $set: req.body,
        },
        {
            runValidators: true,
            new: true,
        }
        )
        .then((dbUserData) => {
          if (!dbUserData) {
            return res.status(404).json({ message: 'No user with this id'});
          }
          res.json(dbUserData);
    })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });    
    },

    // delete user BONUS and delete associated thoughts)
    deleteUser(req, res) {
        user.findOneAndDelete({ _id: req.params.userId })
        .then ((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user data with this id'});
            }

            //BONUS get id's of User's thoughts and  delete them all
            return thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
        })
        .then(() => {
            res.json({ message: 'User and associated thought deleted' });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });    
    },

    // add friend to friend list
    addFriend(req, res) {
       user.findOneAndUpdate({ _id: req.params.userId }, {
            $addToSet: { friends: req.params.friendId } }, {
                new: true })
                .then ((dbUserData) => {
                    if (!dbUserData) {
                      return res.status(404).json({ message: 'No user data with this id'});       
            }
            res.json(dbUserData); 
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });    
    },

    // remove friend to friend list
    removeFriend(req, res) {
    user.findOneAndUpdate({ _id: req.params.userId }, {
    $pull: { friends: req.params.friendId } }, { new: true })
    .then ((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user data with this id'});       
}
     res.json(dbUserData); 
})
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
   });    
  },
};


module.exports = userController;