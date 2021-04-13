//the single purpose of this file is to generate the key pair for the signing of the jwt
//refer to the README.md for further information on when to use it

const { generateKeyPairSync } = require('crypto');
const fs = require('fs');
const path = require('path')
const pathToEnv = path.join(__dirname, '/../.env');
require('dotenv').config({ path: pathToEnv});
const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: process.env.PRIV_KEY_PASSPHRASE
    }
});

//write keys into files
fs.writeFileSync(__dirname + '/pub.pem', publicKey);
fs.writeFileSync(__dirname + '/priv.pem', privateKey);
