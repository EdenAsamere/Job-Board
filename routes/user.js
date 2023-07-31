const express = require('express');
const router = express.Router();
const {getUser,deleteUser,updateUser} = require('../controllers/user')

router.route('/:id').get(getUser).delete(deleteUser).put(updateUser);

module.exports = router;