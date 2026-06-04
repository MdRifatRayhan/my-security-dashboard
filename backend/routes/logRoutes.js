const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');
const upload = require('../middleware/upload');

router.post('/upload', upload.single('logs'), logController.uploadLogs);
router.get('/stats', logController.getStats);
router.post('/sample', logController.generateSample);
router.get('/all', logController.getAllLogs); // এটি নতুন যোগ করা হয়েছে
router.delete('/clear', logController.clearData); // সব ডেটা মোছার রুট

module.exports = router;