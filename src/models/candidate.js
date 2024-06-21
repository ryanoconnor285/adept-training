const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const candidateSchema = new mongoose.Schema({
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
candidateSchema.pre('save', async function(next) {
  const candidate = this;
  if (candidate.isModified('password')) {
    candidate.password = await bcrypt.hash(candidate.password, 8);
  }
  next();
});

// Generate Auth Token
candidateSchema.methods.generateAuthToken = async function() {
  const candidate = this;
  const token = jwt.sign({ _id: candidate._id.toString() }, process.env.JWT_SECRET);
  candidate.tokens = candidate.tokens.concat({ token });
  await candidate.save();
  return token;
};

// Find candidate by credentials
candidateSchema.statics.findByCredentials = async (email, password) => {
  const candidate = await Candidate.findOne({ email });
  if (!candidate) {
    throw new Error('Unable to login');
  }
  const isMatch = await bcrypt.compare(password, candidate.password);
  if (!isMatch) {
    throw new Error('Unable to login');
  }
  return candidate;
};

const Candidate = mongoose.model('Candidate', candidateSchema);
module.exports = Candidate;
