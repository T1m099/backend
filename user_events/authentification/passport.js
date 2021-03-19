const fs = require('fs');
const path = require('path');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const axios = require('axios');

const pathToKey = path.join(__dirname, 'pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey,'utf8');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256'],
    ignoreExpiration: false,
    jsonWebTokenOptions: {
        maxAge: '1d',
/*        clockTimestamp: Math.round(Date.now()/1000),
        clockTolerance: 0*/
    }
};


const strategy = new JwtStrategy(options, (jwt_payload, done) => {
    //verify callback
    //verify, that the token isn't expired, and isn't expired (small problem here, passport apparently doesn't check this)
    // if(Date.now() < jwt_payload.exp) {
        const data = {
            _id: jwt_payload.sub
        };

        axios.post('http://user_logins/getUser', data)
            .then((res) => {
                console.log(res);
                if (res.data === 'No user found') {
                    return done(null, false, {message: 'the user id could not be found in the Database. Please renew your token or register'});
                } else {
                    return done(null, res.data);
                }
            })
            .catch((err) => {
                    return done(err, false, {message: 'something went wrong'});
                }
            );
/*    }
    else{
        return done(null, false, {message: 'token expired'});
    }*/
});

module.exports = (passport) => {
    passport.use(strategy);
}