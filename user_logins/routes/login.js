const express = require('express');
const User = require('../models/user');
const encryptUtils = require('../cryptography/utils')
const jwt = require('../jwt/Jwt');

const router = express.Router();

router.post('/login', function (req, res){
    User.findOne({mail: req.body.mail})
        .then((user) => {

            if(!user){
                res.status(401).json({success: false, msg: "Could not find any user with that mail"})
            }
            const pwIsValid = encryptUtils.validatePw(req.body.password, user.hash, user.salt);

            if(pwIsValid){
                const jwtToken = jwt.issueJWT(user);
                res.status(200).json({success: true, token: jwtToken.token, expiresIn: jwtToken.expiresIn});
            }
            else{
                res.status(401).json({success: false, msg: "Wrong password has been entered"});
            }
        })
        .catch((err)=>{
            console.log(err);
        });
});

module.exports = router;