
const express = require('express');
const { createUser, loginUser, logoutUser } = require('../controllers/userController');
const router = express.Router();

router.post('/create', createUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

module.exports = router;
