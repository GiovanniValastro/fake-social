const express = require('express');
const router = express.Router();
const { createComment, updateComment, deleteComment, likeComment } = require('../controller/comments');
const auth = require('../middleware/auth');

router.post('/', auth, createComment);
router.patch('/:id', auth, updateComment);
router.delete('/:id', auth, deleteComment);
router.patch('/:id/likeComment', auth, likeComment);

module.exports = router;