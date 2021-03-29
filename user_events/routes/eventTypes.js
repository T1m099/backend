const express = require('express');
const EventTypes = require('../models/eventTypes');
const mongoose = require('mongoose');
const passport = require('passport');


const router = express.Router();

router.get('/', passport.authenticate('jwt',{session: false}), (req, res) => {
    EventTypes.find({user_id: req.user._id})
        .select("_id type markingColor title notes start end reminders disease symptoms mood tracking")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                calendar: docs.map(doc => {
                    const {user_id, ...rest} = {doc: []};
                    return {...rest};
                })
            };
            res.status(201).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', passport.authenticate('jwt',{session: false}), (req, res) => {
    const eventType = new EventTypes({
       ...req.body,
        user_id: req.user._id
    })
    eventType.save()
        .then((result) => {
            const {user_id, ...rest} = result
            res.status(201).json({
                    ...rest
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({msg: "Probably a required attribute missing", error: err});
        });
})


router.delete('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    if(req.body._id != null){
        EventTypes.findOneAndDelete({_id: req.body._id}, {useFindAndModify: true},function (err) {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json("Successful deletion");
            }
        });
    }
    else{
        res.status(400).json("Could not find attribute _id in body");
    }
});


router.put('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    if (req.body._id != null) {
        const eventType = new EventTypes({
            ...req.body
        })

        EventTypes.findOneAndUpdate({_id: req.body._id}, eventType, {new: true, useFindAndModify: true}, function (err, result) {
            if (err) {
                res.status(400).json(err);
            } else {
                const {user_id, ...rest} = result
                res.status(200).json(...rest);
            }
        });
    } else {
        res.status(400).json("Could not find attribute _id in body");
    }
});


module.exports = router

