const express = require('express');
const router = express.Router();
const { getMessages, createMessage, deleteMessage } = require('../controller/messages');
const auth = require('../middleware/auth');

router.get('/user/', auth, getMessages);
router.post('/', auth, createMessage);
router.delete('/:id', auth, deleteMessage);

module.exports = router;