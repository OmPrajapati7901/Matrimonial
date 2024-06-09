const express = require('express');
const { verifyJWT } = require('../middlewares/auth.middleware.js');
const { createUserProfile, getUserProfile } = require('../controllers/userProfile.controller.js');
const router = express.Router();


console.log("here in user.route.js")


router.route('/checking').get(verifyJWT, (req, res) => {
    res.send('profile route is working')});

router.route('/create-userprofile').post(verifyJWT,createUserProfile)
router.route('/getuserprofile').get(verifyJWT,getUserProfile)

 
module.exports = router;
