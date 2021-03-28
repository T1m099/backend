const express = require('express');
const Medication = require('../models/medications');
const passport = require('passport');

const router = express.Router();


router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    Medication.find({user_id: req.user._id})
        .select("_id title description unit quantity reminders")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                courses: docs.map(doc => {
                    return {
                        _id: doc._id,
                        title: doc.title,
                        description: doc.description,
                        unit: doc.unit,
                        quantity: doc.quantity,
                        reminders: doc.reminders
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


router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {

    const medication = new Medication({
        uniquenessCheck: req.user._id + req.body.title,
        user_id: req.user._id,
        ...req.body

    })
    medication.save().then((result) => {
        console.log(result)

        res.status(201).json({
            message: 'Entry was successfully',
            createdMedications: {
                _id: result._id,
                title: result.title,
                description: result.description,
                unit: result.unit,
                quantity: result.quantity,
                reminders: result.reminders
            }
        });

    }).catch((err) => {
        console.log(err);
        res.status(409).json("Entity already exists");
    });
});


router.delete('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    if(req.body._id != null){
        Medication.findOneAndDelete({_id: req.body._id}, {useFindAndModify: true}, function (err) {
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
        const medication = new Medication({
            description: req.body.description,
            unit: req.body.unit,
            quantity: req.body.quantity,
            reminders: req.body.reminders
        })


        Medication.findOneAndUpdate({_id: req.body._id}, medication, {new: true, useFindAndModify: true}, function (err, result) {
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

module.exports = router;
