const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  ipAddress: { type: String, required: true },
  username: { type: String, default: 'Anonymous' },
  eventType: { 
    type: String, 
    enum: ['LOGIN_SUCCESS', 'LOGIN_FAILED', 'PASSWORD_RESET', 'ACCESS_DENIED', 'PORT_SCAN_DETECTED', 'UNAUTHORIZED_ACCESS'],
    required: true 
  },
  status: { type: String, required: true },
  raw: String,
  uploadBatch: String
});

module.exports = mongoose.model('Log', logSchema);