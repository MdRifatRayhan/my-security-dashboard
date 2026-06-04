exports.generate = (count) => {
  const ips = ['192.168.1.45', '10.0.0.15', '172.16.254.1', '85.214.1.5', '203.0.113.42'];
  const users = ['admin', 'user1', 'guest', 'db_root', 'system'];
  const types = ['LOGIN_SUCCESS', 'LOGIN_FAILED', 'PASSWORD_RESET', 'ACCESS_DENIED', 'PORT_SCAN_DETECTED', 'UNAUTHORIZED_ACCESS'];
  
  const logs = [];
  for (let i = 0; i < count; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    logs.push({
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 86400000)),
      ipAddress: ips[Math.floor(Math.random() * ips.length)],
      username: users[Math.floor(Math.random() * users.length)],
      eventType: type,
      status: type.includes('SUCCESS') ? '200' : '403'
    });
  }
  return logs;
};