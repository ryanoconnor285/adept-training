const Scenario = require('../models/scenario');
const { getResponse } = require('../services/openAIService');

const getScenarios = async (req, res) => {
  try {
    const scenarios = await Scenario.find();
    res.status(200).send(scenarios);
  } catch (error) {
    res.status(400).send({ error: 'Error fetching scenarios' });
  }
};

const askQuestion = async (req, res) => {
  const { scenarioId, question, treatmentPlan } = req.body;
  try {
    const scenario = await Scenario.findById(scenarioId);
    if (!scenario) {
      return res.status(404).send({ error: 'Scenario not found' });
    }
    const answer = await getResponse(scenario, question, treatmentPlan);
    res.status(200).send({ answer });
  } catch (error) {
    res.status(500).send({ error: 'Error getting response from OpenAI' });
  }
};

module.exports = { getScenarios, askQuestion };
