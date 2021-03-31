const crypto = require('crypto');

function encryptData (text, user){
    //create initialization vector and encryption key
    const initVector = crypto.randomBytes(16);
    const key = crypto.pbkdf2Sync(process.env.ENCRYPT_KEY, user.salt, 100000, 32,  'sha512');


    const cipher = crypto.createCipheriv('aes-256-cbc', key, initVector);
    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex')
    return initVector.toString('hex') + "." + encrypted;
}

function decryptData (cipher, user){
    //create initialization vector and encryption key
    let split = cipher.split(".")
    let initVector = Buffer.from(split[0], 'hex');
    const key = crypto.pbkdf2Sync(process.env.ENCRYPT_KEY, user.salt, 100000, 32, 'sha512');

    //decipher
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, initVector);
    let decrypted = decipher.update(split[1], 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    console.log(decrypted);
    return(decrypted);
}

module.exports.encryptData = encryptData;
module.exports.decryptData = decryptData;