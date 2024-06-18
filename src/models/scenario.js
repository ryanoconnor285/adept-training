const mongoose = require('mongoose');

const scenarioSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  details: {
    type: Object,
    required: true
  }
});

const Scenario = mongoose.model('Scenario', scenarioSchema);

module.exports = Scenario;
