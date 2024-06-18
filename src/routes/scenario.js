const express = require('express');
const router = express.Router();
const scenarioController = require('../controllers/scenarioController');

router.get('/test', scenarioController.test)
router.post('/create', scenarioController.createScenario);
router.post('/ask', scenarioController.askQuestion);

module.exports = router;
