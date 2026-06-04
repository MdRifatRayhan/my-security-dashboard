const PDFDocument = require('pdfkit');
const { Parser } = require('json2csv'); // এটি শুধুমাত্র একবারই থাকবে
const Threat = require('../models/Threat');
const Log = require('../models/Log');

// ১. পিডিএফ রিপোর্ট জেনারেটর
exports.generatePDF = async (req, res) => {
    try {
        const doc = new PDFDocument({ margin: 50 });
        const filename = `Security_Report_${Date.now()}.pdf`;

        res.setHeader('Content-disposition', `attachment; filename=${filename}`);
        res.setHeader('Content-type', 'application/pdf');

        // রিপোর্ট হেডার
        doc.fillColor('#3b82f6').fontSize(25).text('SENTINEL SECURITY REPORT', { align: 'center' });
        doc.fontSize(10).fillColor('#64748b').text(`Generated on: ${new Date().toLocaleString()}`, { align: 'center' });
        doc.moveDown(2);

        // স্ট্যাটিসটিক্স সামারি
        const totalLogs = await Log.countDocuments();
        const totalThreats = await Threat.countDocuments();
        const highThreats = await Threat.countDocuments({ severity: 'High' });

        doc.fillColor('#1e293b').fontSize(16).text('Executive Summary', { underline: true });
        doc.fontSize(12).text(`Total Logs Analyzed: ${totalLogs}`);
        doc.text(`Total Threats Detected: ${totalThreats}`);
        doc.fillColor('#ef4444').text(`Critical (High) Threats: ${highThreats}`);
        doc.moveDown(2);

        // থ্রেট ডিটেইলস টেবিল
        doc.fillColor('#1e293b').fontSize(16).text('Detailed Threat Intel', { underline: true });
        doc.moveDown();

        const threats = await Threat.find().sort({ riskScore: -1 });

        threats.forEach((t, index) => {
            doc.fillColor('#334155').fontSize(12).text(`${index + 1}. [${t.severity}] ${t.type}`);
            doc.fontSize(10).fillColor('#64748b').text(`   IP Address: ${t.ipAddress} | Risk Score: ${t.riskScore}/100`);
            doc.text(`   Reason: ${t.detectionReason}`);
            doc.moveDown(0.5);
        });

        doc.moveDown(2);
        doc.fontSize(10).fillColor('#94a3b8').text('--- End of Sentinel Security Analysis Report ---', { align: 'center' });

        doc.pipe(res);
        doc.end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ২. সিএসভি রিপোর্ট জেনারেটর (CSV Export)
exports.generateCSV = async (req, res) => {
    try {
        const threats = await Threat.find().lean();
        
        // সিএসভি ফাইলে কোন কোন কলাম থাকবে তা নির্ধারণ করা
        const fields = [
            { label: 'Threat Type', value: 'type' },
            { label: 'Severity', value: 'severity' },
            { label: 'IP Address', value: 'ipAddress' },
            { label: 'Risk Score', value: 'riskScore' },
            { label: 'Reason', value: 'detectionReason' },
            { label: 'Last Seen', value: (row) => new Date(row.lastSeen).toLocaleString() }
        ];

        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(threats);

        res.header('Content-Type', 'text/csv');
        res.attachment(`Security_Threats_${Date.now()}.csv`);
        return res.send(csv);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};