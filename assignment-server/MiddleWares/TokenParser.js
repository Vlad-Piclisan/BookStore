const passport = require("passport")
const { APIError } = require("./ErrorHandler")

const tokenParser = (isAdmin = false) => (req, res, next) => passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err || info || !user) {
        return next(new APIError(401, "Unauthorized"))
    }
    if (isAdmin && !user.isAdmin) {
        return next(new APIError(401, "Admin only"))
    }
    req.user = user;
    next();

})(req, res, next);


module.exports = tokenParser;

