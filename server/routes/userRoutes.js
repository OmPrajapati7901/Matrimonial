const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const userProfile = require('../model/userProfileSchema');



router.post('/createUserProfile', userController.createUser);
 router.get('/profile/:userId', userController.getUser);


router.put('/profile/:userId', userController.updateUser);
// router.delete('/:userId', userController.deleteUser);

module.exports = router;
