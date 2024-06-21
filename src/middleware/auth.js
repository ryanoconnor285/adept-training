const jwt = require('jsonwebtoken');
const Evaluator = require('../models/evaluator');
const Candidate = require('../models/candidate');

const evaluatorAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const evaluator = await Evaluator.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!evaluator) {
      throw new Error();
    }

    req.token = token;
    req.evaluator = evaluator;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

const candidateAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const candidate = await Candidate.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!candidate) {
      throw new Error();
    }

    req.token = token;
    req.candidate = candidate;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = { evaluatorAuth, candidateAuth };
