const JwtStrategy = require('passport-jwt').JwtStrategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');

const secret = require('./keys').secretOrKey;

var options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = secret;

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, (jwtPayload, done) => {
            User.findById(jwtPayload.id)
                .then(user => {
                    if (user) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                });
        })
    );
};
