const config = require('../config');
const User = require('../Models/UserModel');
const passport=require("passport")
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.tokenEncryption;
const configPassport = () => {
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        User.findById(jwt_payload.sub , function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);

            }
        });
    }));
}

module.exports = configPassport;