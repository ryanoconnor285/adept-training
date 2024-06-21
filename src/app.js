const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const evaluatorRoutes = require('./routes/evaluator');
const candidateRoutes = require('./routes/candidate');

require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});

app.use(bodyParser.json());
app.use('/api/evaluator', evaluatorRoutes);
app.use('/api/candidate', candidateRoutes);

module.exports = app;
