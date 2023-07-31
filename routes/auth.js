const express = require('express');
const router = express.Router();
const {signupUser,loginUser,logoutUser} = require('../controllers/auth')
router.route('/login').post(loginUser)
router.route('/login').post(logoutUser)
router.route('/signup').post(signupUser);

module.exports=router;``
