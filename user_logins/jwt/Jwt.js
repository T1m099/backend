const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path')
const pathToKey = path.join(__dirname, '/priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8')


//create a jwt for aces to the web services
function issueJWT(user){
    const _id = user._id;
    const expiresIn = '1d';

    //payload, that is base64 encoded in the token --> not encryptet, the least amount of information as possible
    const payload = {
        sub: _id,
        iat: Math.round(Date.now()/1000)
    };

    //sign a new token
    const signedToken = jwt.sign(payload,{key: PRIV_KEY, passphrase: process.env.PRIV_KEY_PASSPHRASE}, {expiresIn: expiresIn, algorithm: 'RS256'});

    return {
        //bring the token in Bearer-Schema
        token: "Bearer " + signedToken,
        expiresIn: new Date(Date.now()+ 23.75*60*60*1000)
    }
}

module.exports.issueJWT = issueJWT;
