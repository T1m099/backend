const crypto = require('crypto');
const User = require('../models/user');

//hash the password --> no decryption possible
function genPassHash(password){
    let salt = crypto.randomBytes(32).toString('hex');
    let pepperedPw = password + process.env.PEPPER;
    let hash = crypto.pbkdf2Sync(pepperedPw, salt, 100000, 64, 'sha512').toString('hex');

    return {
        salt: salt,
        hash: hash,
    }
}


//function for validating a password from a request with the hash in the db
function validatePw(password, hash, salt){
 let pepperedPw = password + process.env.PEPPER;
 const hashToVerify = crypto.pbkdf2Sync(pepperedPw, salt, 100000, 64, 'sha512').toString('hex');
 return hash === hashToVerify;
}


//function for encrypting data saved in Database --> decrypting possible
function encryptData (text){
    //create initialization vector and encryption key
    const initVector = crypto.randomBytes(16);
   // const key = crypto.pbkdf2Sync(process.env.ENCRYPT_KEY, process.env.ENCRYPT_SALT, 100000, 64, 'sha256').toString('hex');
    //test function, since this function istn used in this service
    //generate the key for encryption
    const key = crypto.pbkdf2Sync("test", "teste3", 100000, 32, 'sha512');


    const cipher = crypto.createCipheriv('aes-256-cbc', key, initVector);
    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex')
    return initVector.toString('hex') + "." + encrypted;
}


function decryptData (cipher){
    //this function also isnt used in this service
    //create initialization vector and encryption key
    let split = cipher.split(".")
    let initVector = Buffer.from(split[0], 'hex');
    const key = crypto.pbkdf2Sync("test", "teste3", 100000, 32, 'sha512');

    //decipher
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, initVector);
    let decrypted = decipher.update(split[1], 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    console.log(decrypted);
    return(decrypted);
}

module.exports.genPassHash = genPassHash;
module.exports.validatePw = validatePw;
module.exports.encryptData = encryptData;
module.exports.decryptData = decryptData;