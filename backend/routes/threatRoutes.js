const express = require('express');
const router = express.Router();
const threatController = require('../controllers/threatController');

router.get('/', threatController.getAllThreats);
router.get('/:id', threatController.getThreatDetails);

module.exports = router;