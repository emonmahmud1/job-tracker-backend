// routes/jobRoutes.js
const { allJobs,postjob } = require('../controllers/jobController');
const express = require('express');
const router = express.Router();

router.get('/alljobs', allJobs);
router.post('/postjob', postjob);

module.exports = router;
