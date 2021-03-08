const jwt = require('jsonwebtoken');
const fs = require('fs');

const PRIV_KEY = fs.readFileSync(__dirname + '/priv.pem', 'utf8');

//for testing purposes
/*const payload ={
    sub: '1123456',
    name: 'John Doe',
    iat: 21343565463
};

const signedJWT = jwt.sign(payload, {key: PRIV_KEY, passphrase: 'sptssdf_sdf.89rfj9f9+3ijr92r9sdfvvsdgREGGEDG'}, {algorithm: 'RS256'}, 'sptssdf_sdf.89rfj9f9+3ijr92r9sdfvvsdgREGGEDG');
console.log(signedJWT);*/
