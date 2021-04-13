const crypto = require('crypto');


//encryption method fot uploaded files
function encryptData (text, user){
    //create initialization vector and encryption key
    const initVector = crypto.randomBytes(16);
    //the encryption key consists of a serverside password and the user salt --> is unique for each user
    //pbkdf produces a hash of a fixed length --> necessary for create cipher
    const key = crypto.pbkdf2Sync(process.env.ENCRYPT_KEY, user.salt, 100000, 32,  'sha512');

    //create the cipher (the encrypted file)
    const cipher = crypto.createCipheriv('aes-256-cbc', key, initVector);
    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex')
    //initialization vector needs to be stored and is just prepended to the encrypted file
    return initVector.toString('hex') + "." + encrypted;
}


//decryption method for uploaded and encrypted files
function decryptData (cipher, user){
    //create initialization vector and encryption key
    let split = cipher.split(".")
    //initialization vector need to be extracted and the original encryption key restored
    let initVector = Buffer.from(split[0], 'hex');
    const key = crypto.pbkdf2Sync(process.env.ENCRYPT_KEY, user.salt, 100000, 32, 'sha512');

    //decipher the encrypted file
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, initVector);
    let decrypted = decipher.update(split[1], 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    console.log(decrypted);
    return(decrypted);
}

module.exports.encryptData = encryptData;
module.exports.decryptData = decryptData;