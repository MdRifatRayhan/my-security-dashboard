const mongoose = require('mongoose');

const threatSchema = new mongoose.Schema({
  type: { type: String, required: true },
  severity: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
  ipAddress: { type: String, required: true },
  eventCount: { type: Number, default: 1 },
  riskScore: { type: Number, min: 0, max: 100 },
  detectionReason: String,
  status: { type: String, enum: ['Open', 'Investigating', 'Resolved'], default: 'Open' },
  firstSeen: Date,
  lastSeen: Date
});

module.exports = mongoose.model('Threat', threatSchema);