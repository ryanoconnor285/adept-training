const express = require('express');
const router = express.Router();
const scenarioRoutes = require('./scenario');

router.use('/scenarios', scenarioRoutes);

module.exports = router;
