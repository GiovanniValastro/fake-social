const express = require('express');
const router = express.Router();
const { getNotifications, createNotification, updateNotification, deleteAllNotifications, deleteNotification } = require('../controller/notifications');
const auth = require('../middleware/auth');

router.get('/', auth, getNotifications);
router.post('/', auth, createNotification);
router.patch('/', auth, updateNotification);
router.delete('/', auth, deleteAllNotifications);
router.delete('/:id', auth, deleteNotification);

module.exports = router;