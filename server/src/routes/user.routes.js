const express = require('express');
const { 
    loginUser, 
    logoutUser, 
    registerUser, 
    refreshAccessToken, 
    changeCurrentPassword, 
    getCurrentUser, 
    updateAccountDetails 
} = require('../controllers/user.controller.js');
const { verifyJWT } = require('../middlewares/auth.middleware.js');

const router = express.Router();

router.route('/register').post(
    registerUser
);

console.log("here in user.route.js")
router.route('/login').post(loginUser);

// Secured routes
router.route('/logout').post(verifyJWT, logoutUser);
router.route('/refresh-token').post(refreshAccessToken);
router.route('/change-password').post(verifyJWT, changeCurrentPassword);
router.route('/current-user').get(verifyJWT, getCurrentUser);
router.route('/update-account').patch(verifyJWT, updateAccountDetails);

module.exports = router;
