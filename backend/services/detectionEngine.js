const Threat = require('../models/Threat');
const Log = require('../models/Log');

exports.analyzeLogs = async (batchId, io) => {
  const logs = await Log.find({ uploadBatch: batchId });
  const threatsFound = [];

  const ipGroups = {};
  logs.forEach(log => {
    if (!ipGroups[log.ipAddress]) ipGroups[log.ipAddress] = [];
    ipGroups[log.ipAddress].push(log);
  });

  for (const ip in ipGroups) {
    const ipLogs = ipGroups[ip];
    const failedLogins = ipLogs.filter(l => l.eventType === 'LOGIN_FAILED');
    const unauthorized = ipLogs.filter(l => l.eventType === 'UNAUTHORIZED_ACCESS' || l.eventType === 'ACCESS_DENIED');
    
    let threatData = {
      ipAddress: ip,
      eventCount: ipLogs.length,
      firstSeen: ipLogs[0].timestamp,
      lastSeen: ipLogs[ipLogs.length - 1].timestamp,
    };

    if (failedLogins.length >= 5) {
      threatData.type = 'Brute Force Attempt';
      threatData.severity = 'High';
      threatData.riskScore = 85;
      threatData.detectionReason = `${failedLogins.length} failed login attempts detected.`;
      threatsFound.push(new Threat(threatData));
    } else if (ipLogs.some(l => l.eventType === 'PORT_SCAN_DETECTED')) {
      threatData.type = 'Port Scan';
      threatData.severity = 'Medium';
      threatData.riskScore = 55;
      threatData.detectionReason = 'System detected sequential port probing.';
      threatsFound.push(new Threat(threatData));
    } else if (unauthorized.length >= 3) {
      threatData.type = 'Unauthorized Access Pattern';
      threatData.severity = 'High';
      threatData.riskScore = 75;
      threatData.detectionReason = 'Repeated access to restricted resources.';
      threatsFound.push(new Threat(threatData));
    }
  }

  if (threatsFound.length > 0) {
    await Threat.insertMany(threatsFound);
    
    // সকেট নোটিফিকেশন পাঠানো
    if (io) {
        io.emit('newThreatAlert', {
            message: 'Critical Threat Detected!',
            count: threatsFound.length,
            topThreat: threatsFound[0].type
        });
    }
  }
  
  return threatsFound.length;
};