const ensureAuthenticated = (req, res, next) => {
    console.log(req.isAuthenticated())
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = ensureAuthenticated;
