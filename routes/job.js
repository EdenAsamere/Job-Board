const express = require('express');
const router = express.Router()
const {auth} = require('../middleware/auth')
const {
    getJob,
    getJobs,
    createJob,
    editJob,
    deleteJob,
            } = require('../controllers/jobs');

router.route('/').get(getJobs).post(createJob);
router.route('/:id').get(getJob).delete(deleteJob)
router.route('/update/:id').put(editJob);
module.exports=router;