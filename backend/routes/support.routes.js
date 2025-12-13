const express = require('express');
const router = express.Router();
const rateLimit = require('../middleware/rateLimit');
const controller = require('../controllers/support.controller');

router.post(
  '/post/:id',
  rateLimit({ max: 20 }),
  controller.supportPost
);

module.exports = router;
