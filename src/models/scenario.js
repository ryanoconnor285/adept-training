const mongoose = require('mongoose');

const scenarioSchema = new mongoose.Schema({
  type: { type: String, required: true },
  description: { type: String, required: true },
  initialConditions: { type: Object, required: true },
  steps: { type: Array, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Evaluator' },
});

const Scenario = mongoose.model('Scenario', scenarioSchema);
module.exports = Scenario;
