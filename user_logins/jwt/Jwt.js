const jwt = require('jsonwebtoken');
const fs = require('fs');
const jsonwebtoken = require("jsonwebtoken");
const path = require('path')

const pathToKey = path.join(__dirname, '/priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8')



function issueJWT(user){
    const _id = user._id;
    const expiresIn = '1h';

    const payload = {
        sub: _id,
        iat: Math.round(Date.now()/1000)
    };
    const signedToken = jsonwebtoken.sign(payload,{key: PRIV_KEY, passphrase: process.env.PRIV_KEY_PASSPHRASE}, {expiresIn: expiresIn, algorithm: 'RS256'});

    return {
        token: "Bearer " + signedToken,
        expiresIn: expiresIn
    }
}

module.exports.issueJWT = issueJWT;
