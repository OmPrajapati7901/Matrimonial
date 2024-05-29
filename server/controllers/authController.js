const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const verifyUser = (req, res) => {
    res.status(200).json({ user: req.user });
};

const logoutUser = (req, res, next) => {
    console.log("from logout user")
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect("http://localhost:3001");
    });
};

module.exports = {
    ensureAuthenticated,
    verifyUser,
    logoutUser
};
