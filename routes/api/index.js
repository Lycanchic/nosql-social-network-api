// Creates an Express router and sets up routes for users and thoughts by mounting their respective route handlers
const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

router.use('/users', userRoutes)
router.use('/thoughts', thoughtRoutes);

module.exports = router;