const express = require('express');
const User = require('../models/user');
const encryptUtils = require('../cryptography/utils')
const jwt = require('../jwt/Jwt');

const router = express.Router();

//route for registering a new user
router.post('/', function (req, res){
    if(req.body.password != null && req.body.password.length > 1){
        //Hash the password if it is given in the body
        let saltAndHash = encryptUtils.genPassHash(req.body.password);
        let hash = saltAndHash.hash;
        let salt = saltAndHash.salt;


        const user = new User({
            name: req.body.name,
            mail: req.body.mail,
            hash: hash,
            salt: salt
        });

        //save the user in the db and return the object and the jwt
        user.save()
            .then((result) => {
                const jwtToken = jwt.issueJWT(result);
                console.log('User created');
                const {hash, _id: id, salt, __v, ...rest} = result.toObject()
                res.status(201).json({user: {id, ...rest}, token: jwtToken.token, expiresIn: jwtToken.expiresIn});
            })
            .catch((err) => {
                console.log(err);
                res.status(409).json("User already exists");
            });
    }

    else{
        res.status(400).json("Password missing or too short");
    }
});

module.exports = router;