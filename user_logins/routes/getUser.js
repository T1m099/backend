const express = require('express');
const User = require("../models/user");


const router = express.Router();


router.post('/', async function (req, res){
    const user = await User.findById(req.body._id).exec();
    if(user != null){
        res.send(user);
    }
    else{
        res.send('No user found');
    }
});

module.exports = router;