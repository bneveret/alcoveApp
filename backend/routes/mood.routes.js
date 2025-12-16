const express = require('express');
const router = express.Router();
const controller = require('../controllers/mood.controller');

router.post('/', controller.submitMood);
router.get('/', controller.getMoodStats);

module.exports = router;
