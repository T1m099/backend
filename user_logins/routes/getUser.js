const express = require('express');
const User = require("../models/user");


const router = express.Router();

//route for checking if a user exists
//called by passport middleware --> check if user that is given in a token still exists
router.post('/', async function (req, res){
    const user = await User.findById(req.body._id).exec();
    if(user != null){
        res.send(user);
    }
    else{
        res.status(404).json('No user found');
    }
});

module.exports = router;