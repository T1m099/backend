const { generateKeyPairSync } = require('crypto');
const fs = require('fs')
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
        passphrase: 'sptssdf_sdf.89rfj9f9+3ijr92r9sdfvvsdgREGGEDG'
    }
});

console.log(__dirname)
fs.writeFileSync(__dirname + '/pub.pem', publicKey);
fs.writeFileSync(__dirname + '/priv.pem', privateKey);
