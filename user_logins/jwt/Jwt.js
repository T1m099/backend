const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path')
const pathToKey = path.join(__dirname, '/priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8')



function issueJWT(user){
    const _id = user._id;
    const expiresIn = '1d';

    const payload = {
        sub: _id,
        iat: Math.round(Date.now()/1000)
    };
    const signedToken = jwt.sign(payload,{key: PRIV_KEY, passphrase: process.env.PRIV_KEY_PASSPHRASE}, {expiresIn: expiresIn, algorithm: 'RS256'});

    return {
        token: "Bearer " + signedToken,
        expiresIn: new Date(Date.now()+ 23.75*60*60*1000)
    }
}

module.exports.issueJWT = issueJWT;
