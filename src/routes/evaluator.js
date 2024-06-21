const express = require('express');
const { createScenario, getScenarios } = require('../controllers/evaluatorController');
const { evaluatorAuth } = require('../middleware/auth');
const router = express.Router();

router.post('/scenarios', evaluatorAuth, createScenario);
router.get('/scenarios', evaluatorAuth, getScenarios);

module.exports = router;
