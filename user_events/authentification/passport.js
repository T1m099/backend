const fs = require('fs');
const path = require('path');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const axios = require('axios');

const pathToKey = path.join(__dirname, 'pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');


//this file sets all the options for passport
//passport is the middleware used to secure the routes

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256'],
    ignoreExpiration: false,
    jsonWebTokenOptions: {
        maxAge: '2d'
    }
};


const strategy = new JwtStrategy(options, (jwt_payload, done) => {
    //verify callback
    const data = {
        _id: jwt_payload.sub
    };

    //after validating the jwt check if the user even still exists before authorizing the user to access the route
    //a call to the user_logins service needs to be made
    axios.post('http://user_logins/getUser', data)
        .then((res) => {
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
});

module.exports = (passport) => {
    passport.use(strategy);
}