const express = require('express');
const router = express.Router();
const { getUser, updateUser, updateFriendsList, deleteUser } = require('../controller/users');
const auth = require('../middleware/auth')

router.get('/:id', getUser);
router.patch('/friends/:id', auth, updateFriendsList)
router.patch('/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);

module.exports = router;
