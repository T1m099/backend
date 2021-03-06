const express = require('express');
const User = require('../models/user');
const encryptUtils = require('../cryptography/utils')
const jwt = require('../jwt/Jwt');

const router = express.Router();


//route for logging in --> getting a new jwt
router.post('/', function (req, res){
    //find user by the mail
    User.findOne({mail: req.body.mail})
        .then((user) => {

            if(!user) {
                return res.status(404).json({success: false, msg: "Could not find any user with that mail"})
            }
            else{
                //check if the given password is correct
                const pwIsValid = encryptUtils.validatePw(req.body.password, user.hash, user.salt);

                if(pwIsValid){
                    const jwtToken = jwt.issueJWT(user);
                    res.status(200).json({success: true, token: jwtToken.token, expiresIn: jwtToken.expiresIn, user:{
                        username: user.name,
                            email: user.mail
                        }});
                }
                else{
                    res.status(401).json({success: false, msg: "Wrong password has been entered"});
                }
            }
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).json("Internal Error");
        });
});

module.exports = router;