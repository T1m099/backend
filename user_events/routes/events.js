const express = require('express');
const Events = require('../models/events');
const mongoose = require('mongoose');
const passport = require('passport');


const router = express.Router();

router.get('/', passport.authenticate('jwt',{session: false}), (req, res) => {
    Events.find({user_id: req.user._id})
        .then(docs => {
            const response = {
                events: docs.map(doc => {
                    const {user_id,__v,_id:id,...rest} = doc.toObject()
                    return {
                        id,...rest
                    }
                })
            }
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
    const eventType = new Events({
        ...req.body,
        user_id: req.user._id
    })
    eventType.save()
        .then((result) => {
            const {user_id,__v,_id:id,...rest} = result.toObject()
            res.status(201).json({id,...rest});
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({msg: "Probably a required attribute missing", error: err});
        });
})


router.delete('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    if(req.body._id != null){
        Events.findOneAndDelete({_id: req.body.id}, {useFindAndModify: true},function (err) {
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
    if (req.body.id != null) {
        const eventType = new Events({
            ...req.body
        })

        Events.findOneAndUpdate({_id: req.body.id}, eventType, {new: true, useFindAndModify: true}, function (err, result) {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json(result);
            }
        });
    } else {
        res.status(400).json("Could not find attribute _id in body");
    }
});


module.exports = router
