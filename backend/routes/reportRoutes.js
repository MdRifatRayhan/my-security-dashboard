const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/download/pdf', reportController.generatePDF);
router.get('/download/csv', reportController.generateCSV);

module.exports = router;