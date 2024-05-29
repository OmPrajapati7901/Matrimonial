const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("../controllers/authController");

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", {
    successRedirect: "http://localhost:3001/dashboard",
    failureRedirect: "http://localhost:3001/login"
}));

router.get("/verify", authController.ensureAuthenticated, authController.verifyUser);

router.get("/logout", authController.logoutUser);

module.exports = router;
