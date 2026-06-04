const Log = require('../models/Log');
const Threat = require('../models/Threat');
const parserService = require('../services/parserService');
const detectionEngine = require('../services/detectionEngine');
const sampleGenerator = require('../utils/sampleGenerator');

exports.uploadLogs = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const batchId = Date.now().toString();
    const parsedLogs = parserService.parseLogFile(req.file.path);
    const logsToSave = parsedLogs.map(log => ({ ...log, uploadBatch: batchId }));
    await Log.insertMany(logsToSave);

    const io = req.app.get('socketio'); 
    const threatCount = await detectionEngine.analyzeLogs(batchId, io);

    res.json({ message: 'Logs processed', count: logsToSave.length, threatsDetected: threatCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStats = async (req, res) => {
  const totalLogs = await Log.countDocuments();
  const failedLogins = await Log.countDocuments({ eventType: 'LOGIN_FAILED' });
  const eventDistribution = await Log.aggregate([{ $group: { _id: '$eventType', count: { $sum: 1 } } }]);
  res.json({ totalLogs, failedLogins, eventDistribution });
};

exports.generateSample = async (req, res) => {
  const samples = sampleGenerator.generate(50);
  const batchId = 'sample-' + Date.now();
  const logsToSave = samples.map(log => ({ ...log, uploadBatch: batchId }));
  await Log.insertMany(logsToSave);
  
  const io = req.app.get('socketio');
  await detectionEngine.analyzeLogs(batchId, io);
  
  res.json({ message: 'Sample logs generated' });
};

exports.getAllLogs = async (req, res) => {
  try {
    const logs = await Log.find().sort({ timestamp: -1 }).limit(100);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.clearData = async (req, res) => {
  try {
    await Log.deleteMany({});
    await Threat.deleteMany({});
    res.json({ message: 'Dashboard reset successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};