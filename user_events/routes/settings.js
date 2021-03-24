const express = require('express');
const Settings = require('../models/settings');
const mongoose = require('mongoose');
const passport = require('passport');

const router = express.Router();

router.get('/', passport.authenticate('jwt',{session: false}), (req, res) => {
    Settings.find({user_id: req.user._id})
        .select("_id user_settings")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                courses: docs.map(doc => {
                    return {
                        _id: doc._id,
                        user_settings: doc.user_settings
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


router.post('/', passport.authenticate('jwt',{session: false}),(req, res) => {

    const settings = new Settings({
        _id: new mongoose.Types.ObjectId(),
        user_settings: req.body.user_settings,
        user_id: req.user._id
    })
    settings.save().then((result) => {
        console.log(result)
        res.status(201).json({
            message: 'Entry was successfully',
            createdCourses: {
                user_settings: result.user_settings
            }
        });
    }) .catch((err) => {
        console.log(err);
        res.status(409).json("Entity already exists");
    });
});

router.put('/', passport.authenticate('jwt',{session: false}), (req, res) =>{
    if(req.body.user_settings!=null) {
        Settings.findOneAndUpdate({user_id: req.user._id}, {user_settings: req.body.user_settings}, {new: true},
            function (err, result) {
                if (err) {
                    res.status(400).json(err);
                } else {
                    res.status(200).json(result);
                }
            });
    }else{
        res.status(400).json("Could not find attribute user_settings");
    }
});

module.exports = router;
