const Threat = require('../models/Threat');

exports.getAllThreats = async (req, res) => {
    try {
        const threats = await Threat.find().sort({ lastSeen: -1 });
        res.json(threats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getThreatDetails = async (req, res) => {
    try {
        const threat = await Threat.findById(req.params.id);
        res.json(threat);
    } catch (error) {
        res.status(404).json({ message: "Threat not found" });
    }
};