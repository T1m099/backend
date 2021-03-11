const fs = require('fs');
const path = require('path');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


const pathToKey = path.join(__dirname, 'pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey,'utf8');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
};

const strategy = new JwtStrategy(options, (jwt_payload, done) => {
    //this function is called, after the jw is validated
    //verify callback
    return done(null, {user: 'test', name: 'Albrecht'})
});

module.exports = (passport) => {
    passport.use(strategy);
}