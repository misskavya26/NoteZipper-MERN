const express = require('express');
const { UserRegister, UserLogin, UserProfile } = require('../Controller/UserController');
const protect = require('../authMiddleware/authMiddleware');

const router = express.Router();

router.route("/").post(UserRegister);
router.route("/login").post(UserLogin);
router.route('/profile').post(protect, UserProfile);

module.exports = router;