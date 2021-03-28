const express = require('express');
const User = require('../models/user');
const encryptUtils = require('../cryptography/utils')
const jwt = require('../jwt/Jwt');

const router = express.Router();

//get a new jwt --> user is searched in db by mail
//object needed in body: {name: ..., password: ..., mail: ...}
router.post('/', function (req, res, next){
    if(req.body.password != null && req.body.password.length > 1){
        let saltAndHash = encryptUtils.genPassHash(req.body.password);
        let hash = saltAndHash.hash;
        let salt = saltAndHash.salt;


        const user = new User({
            name: req.body.name,
            mail: req.body.mail,
            hash: hash,
            salt: salt
        });

        user.save()
            .then((result) => {
                const jwtToken = jwt.issueJWT(result);
                console.log('User created');
                //respond with a token and a succcess message
                res.status(201).json({success: true, token: jwtToken.token, expiresIn: jwtToken.expiresIn});
            })
            .catch((err) => {
                res.status(409).json("User already exists");
                next();
            });
    }

    else{
        res.status(400).json("Password missing or too short");
    }
});

module.exports = router;