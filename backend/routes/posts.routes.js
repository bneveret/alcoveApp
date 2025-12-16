const express = require('express');
const router = express.Router();
const controller = require('../controllers/posts.controller');

router.post('/', controller.createPost);
router.get('/', controller.getPosts);
router.get('/:id', controller.getPostById);
router.put('/:id', controller.updatePost);
router.delete('/:id', controller.deletePost);

module.exports = router;
