const express = require('express');
const evaluatorRoutes = require('./evaluator');
const candidateRoutes = require('./candidate');

const router = express.Router();

router.use('/evaluator', evaluatorRoutes);
router.use('/candidate', candidateRoutes);

module.exports = router;
