const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  app.listen(process.env.PORT || 3001, () => {
    console.log(`API server listening on port ${PORT}`);
  });
});