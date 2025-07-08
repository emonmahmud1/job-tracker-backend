// routes/jobRoutes.js
const { allJobs,postjob } = require('../controllers/jobController');
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/alljobs', authMiddleware, allJobs);
router.post('/postjob', postjob);

module.exports = router;
