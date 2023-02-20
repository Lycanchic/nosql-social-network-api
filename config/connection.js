const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI ||'monogdb://127.0.0.1:27017/socialmedia', {
       useNewUrlParser: true,
       useUnifiedTopology: true
    });

module.exports = mongoose.connection;