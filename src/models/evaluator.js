const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const evaluatorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
});

// Hash the plain text password before saving
evaluatorSchema.pre('save', async function(next) {
  const evaluator = this;
  if (evaluator.isModified('password')) {
    evaluator.password = await bcrypt.hash(evaluator.password, 8);
  }
  next();
});

// Generate Auth Token
evaluatorSchema.methods.generateAuthToken = async function() {
  const evaluator = this;
  const token = jwt.sign({ _id: evaluator._id.toString() }, process.env.JWT_SECRET);
  evaluator.tokens = evaluator.tokens.concat({ token });
  await evaluator.save();
  return token;
};

// Find evaluator by credentials
evaluatorSchema.statics.findByCredentials = async (email, password) => {
  const evaluator = await Evaluator.findOne({ email });
  if (!evaluator) {
    throw new Error('Unable to login');
  }
  const isMatch = await bcrypt.compare(password, evaluator.password);
  if (!isMatch) {
    throw new Error('Unable to login');
  }
  return evaluator;
};

const Evaluator = mongoose.model('Evaluator', evaluatorSchema);
module.exports = Evaluator;
