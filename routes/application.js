const express = require('express');
const router = express.Router()
const {
    getapplication,
    getapplications,
    deleteapplication,
    createapplication
                    } = require('../controllers/application');

router.route('/').get(getapplications).post(createapplication)
router.route('/:id').get(getapplication).delete(deleteapplication);

module.exports=router;