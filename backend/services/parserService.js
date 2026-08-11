const fs = require('fs');

exports.parseLogFile = (filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const parsedLogs = [];

    const ipRegex = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;

    lines.forEach(line => {
        const trimmedLine = line.trim();
        if (!trimmedLine) return;

        const ipMatch = trimmedLine.match(ipRegex);
        const ipAddress = ipMatch ? ipMatch[0] : '0.0.0.0';

        let eventType = 'UNKNOWN_EVENT';
        let status = 'INFO';
        const lowerLine = trimmedLine.toLowerCase();

        // কি-ওয়ার্ড ডিটেকশন
        if (lowerLine.includes('fail') || lowerLine.includes('invalid')) {
            eventType = 'LOGIN_FAILED';
            status = '401';
        } else if (lowerLine.includes('success') || lowerLine.includes('accepted')) {
            eventType = 'LOGIN_SUCCESS';
            status = '200';
        } else if (lowerLine.includes('denied') || lowerLine.includes('unauthorized')) {
            eventType = 'UNAUTHORIZED_ACCESS';
            status = '403';
        } else if (lowerLine.includes('scan')) {
            eventType = 'PORT_SCAN_DETECTED';
            status = '200';
        }

        parsedLogs.push({
            timestamp: new Date(),
            ipAddress: ipAddress,
            username: 'Anonymous',
            eventType: eventType,
            status: status,
            raw: trimmedLine
        });
    });

    console.log(`Total parsed logs: ${parsedLogs.length}`); // এটি টার্মিনালে চেক করবেন
    return parsedLogs;
};