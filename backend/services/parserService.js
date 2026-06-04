const fs = require('fs');

exports.parseLogFile = (filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const parsedLogs = [];

    // ১. স্মার্ট আইপি অ্যাড্রেস ডিটেক্টর (এটি যেকোনো ফরম্যাটের ভেতর থেকে IP খুঁজে বের করবে)
    const ipRegex = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;

    lines.forEach(line => {
        if (!line.trim()) return;

        // ২. আইপি অ্যাড্রেস খোঁজা
        const ipMatch = line.match(ipRegex);
        const ipAddress = ipMatch ? ipMatch[0] : '0.0.0.0';

        // ৩. কী-ওয়ার্ড এর মাধ্যমে ইভেন্ট টাইপ বের করা (স্মার্ট ম্যাপিং)
        let eventType = 'UNKNOWN_EVENT';
        let status = 'INFO';

        const lowerLine = line.toLowerCase();

        if (lowerLine.includes('fail') || lowerLine.includes('invalid password')) {
            eventType = 'LOGIN_FAILED';
            status = '401';
        } else if (lowerLine.includes('success') || lowerLine.includes('accepted password')) {
            eventType = 'LOGIN_SUCCESS';
            status = '200';
        } else if (lowerLine.includes('denied') || lowerLine.includes('unauthorized')) {
            eventType = 'UNAUTHORIZED_ACCESS';
            status = '403';
        } else if (lowerLine.includes('port scan') || lowerLine.includes('probing')) {
            eventType = 'PORT_SCAN_DETECTED';
            status = '200';
        } else if (lowerLine.includes('reset')) {
            eventType = 'PASSWORD_RESET';
            status = '200';
        }

        // ৪. টাইমস্ট্যাম্প বের করার চেষ্টা (না পেলে বর্তমান সময়)
        let timestamp = new Date();
        const dateMatch = line.match(/\[(.*?)\]/); // যদি থার্ড ব্র্যাকেটে তারিখ থাকে
        if (dateMatch) {
            const potentialDate = new Date(dateMatch[1]);
            if (!isNaN(potentialDate)) timestamp = potentialDate;
        }

        parsedLogs.push({
            timestamp: timestamp,
            ipAddress: ipAddress,
            username: 'Anonymous', // অনেক লগে ইউজার থাকে না
            eventType: eventType,
            status: status,
            raw: line
        });
    });

    return parsedLogs;
};