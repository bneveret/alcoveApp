const express = require('express');
const router = express.Router();
const rateLimit = require('../middleware/rateLimit');
const controller = require('../controllers/mood.controller');

router.post('/', rateLimit({ max: 10 }), controller.submitMood);
router.get('/', controller.getMoodStats);

module.exports = router;
