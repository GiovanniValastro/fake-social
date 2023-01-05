const express = require('express');
const router = express.Router();
const { createPost, getPosts, getPost, getPostByCreator, updatePost, deletePost, likePost, getPostsByLike, getPostByTags } = require('../controller/posts');
const auth = require('../middleware/auth');

router.get('/creator/', getPostByCreator);
router.get('/tags/', getPostByTags);
router.get('/user/', getPostsByLike)
router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost)

module.exports = router;