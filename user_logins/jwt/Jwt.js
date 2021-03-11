const jwt = require('jsonwebtoken');
const fs = require('fs');
const jsonwebtoken = require("jsonwebtoken");
const path = require('path')

const pathToKey = path.join(__dirname, '/priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8')

/*//for testing purposes
const payload ={
    sub: '1123456',
    name: 'John Doe',
    iat: 21343565463
};

const signedJWT = jwt.sign(payload, {key: PRIV_KEY, passphrase: 'sptssdf_sdf.89rfj9f9+3ijr92r9sdfvvsdgREGGEDG'}, {algorithm: 'RS256'}, 'sptssdf_sdf.89rfj9f9+3ijr92r9sdfvvsdgREGGEDG');
console.log(signedJWT);*/



function issueJWT(user){
    const _id = user._id;
    const expiresIn = '1d';

    const payload = {
        sub: _id,
        iat: Date.now()
    };

    const signedToken = jsonwebtoken.sign(payload,{key: PRIV_KEY, passphrase: 'sptssdf_sdf.89rfj9f9+3ijr92r9sdfvvsdgREGGEDG'}, {expiresIn: expiresIn, algorithm: 'RS256'})

    return {
        token: "Bearer " + signedToken,
        expiresIn: expiresIn
    }
}

module.exports.issueJWT = issueJWT;
