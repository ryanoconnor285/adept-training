const Evaluator = require('../models/evaluator');
const Scenario = require('../models/scenario');

const createScenario = async (req, res) => {
  try {
    const scenario = new Scenario({ ...req.body, createdBy: req.evaluator._id });
    await scenario.save();
    res.status(201).send({ message: 'Scenario created successfully', scenario });
  } catch (error) {
    res.status(400).send({ error: 'Error creating scenario' });
  }
};

const getScenarios = async (req, res) => {
  try {
    const scenarios = await Scenario.find({ createdBy: req.evaluator._id });
    res.status(200).send(scenarios);
  } catch (error) {
    res.status(400).send({ error: 'Error fetching scenarios' });
  }
};

module.exports = { createScenario, getScenarios };
