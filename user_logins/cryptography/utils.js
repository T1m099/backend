const crypto = require('crypto');



function genPassHash(password){
    let salt = crypto.randomBytes(32).toString('hex');
    let hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');

    return {
        salt: salt,
        hash: hash,
    }
};

function validatePw(password, hash, salt){
 const hashToVarify = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
 return hash === hashToVarify;
}

module.exports.genPassHash = genPassHash;
module.exports.validatePw = validatePw;