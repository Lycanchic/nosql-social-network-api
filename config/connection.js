// import the mongoose module
const mongoose = require('mongoose');

// define the options to be passed to the mongoose connect method
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// connect to the MongoDB database using the connection string specified in the environment variables
// if no connection string is found, use the default connection string
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialmedia', options);

// export the database connection object for use in other parts of the application
module.exports = mongoose.connection;