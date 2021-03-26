const express = require('express');
const User = require('../models/user');
const encryptUtils = require('../cryptography/utils')
const jwt = require('../jwt/Jwt');

const router = express.Router();

router.post('/', function (req, res, next){
    User.findOne({mail: req.body.mail})
        .then((user) => {

            if(!user) {
                res.status(404).json({success: false, msg: "Could not find any user with that mail"})
            }
            else{
                const hashIsValid = encryptUtils.validateHash(req.body.password, req.body.mail);
                if(hashIsValid){
                    const jwtToken = jwt.issueJWT(user);
                    res.status(200).json({success: true, token: jwtToken.token, expiresIn: jwtToken.expiresIn,
                        user: {
                            mail: user.mail,
                            hash: user.hash
                        }});
                }
                else{
                    res.status(401).json({success: false, msg: "Wrong password has been entered"});
                }
            }

        })
        .catch((err)=>{
            console.log(err);
            res.status(500).json("Internal error");
        });

});

module.exports = router