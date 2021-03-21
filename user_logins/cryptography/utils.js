const crypto = require('crypto');
const User = require('../models/user');


function genPassHash(password){
    let salt = crypto.randomBytes(32).toString('hex');
    let hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');

    return {
        salt: salt,
        hash: hash,
    }
}

function validatePw(password, hash, salt){
 const hashToVerify = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
 return hash === hashToVerify;
}

async function validateHash(hash, mail) {
    const user = await User.findOne(({mail: mail}))
        .catch((err) => {
            console.log(err);
        })
    console.log(user)
    return user.hash === hash;
}

module.exports.genPassHash = genPassHash;
module.exports.validatePw = validatePw;
module.exports.validateHash = validateHash;