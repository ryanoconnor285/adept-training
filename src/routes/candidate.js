const express = require('express');
const { getScenarios, askQuestion } = require('../controllers/candidateController');
const { candidateAuth } = require('../middleware/auth');
const router = express.Router();

router.get('/scenarios', candidateAuth, getScenarios);
router.post('/ask', candidateAuth, askQuestion);

module.exports = router;
