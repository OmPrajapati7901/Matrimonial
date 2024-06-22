const express = require("express");
const { verifyJWT } = require("../middlewares/auth.middleware.js");
const {
  createUserProfile,
  getUserProfile,
} = require("../controllers/userProfile.controller.js");
const { testing, match } = require("../controllers/match.controller.js");
const router = express.Router();

console.log("here in user match.js");

// router.route('/checking').get(verifyJWT, (req, res) => {
//     res.send('match route is working')});

router.route("/checking").get(verifyJWT, testing);
router.route("/match").get(verifyJWT, match);


module.exports = router;
