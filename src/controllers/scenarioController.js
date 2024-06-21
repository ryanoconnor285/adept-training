const openAIService = require('../services/openAIService');
const Scenario = require('../models/scenario');

exports.test = async (req, res) => {
  try {
    res.status(201).send({ message: 'Scenario endpoint is working' });
  } catch (error) {
    res.status(400).send({ error: 'Error creating scenario' });
  }
};

exports.createScenario = async (req, res) => {
  try {
    const scenario = new Scenario(req.body);
    await scenario.save();
    res.status(201).send({ message: 'Scenario created successfully', scenario });
  } catch (error) {
    res.status(400).send({ error: 'Error creating scenario' });
  }
};

exports.askQuestion = async (req, res) => {
  const { scenarioId, question } = req.body;
  try {
    const scenario = await Scenario.findById(scenarioId);
    if (!scenario) {
      return res.status(404).send({ error: 'Scenario not found' });
    }
    const answer = await openAIService.getResponse(scenario, question);
    res.status(200).send({ answer });
  } catch (error) {
    res.status(500).send({ error: 'Error OpenAI' });
  }
};
