const express = require('express');
const Medication = require('../models/medications');
const passport = require('passport');

const router = express.Router();


router.get('/',passport.authenticate('jwt',{session: false}), (req, res) => {
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


router.post('/', passport.authenticate('jwt',{session: false}),(req, res) => {

    const medications = new Medication({
        _id: req.user._id + req.body.title,
        title: req.body.title,
        description: req.body.description,
        unit: req.body.unit,
        quantity: req.body.quantity,
        reminders: req.body.reminders,
        user_id: req.user._id

    })
    medications.save().then((result) => {
        console.log(result)

        res.status(201).json({
            message: 'Entry was successfully',
            createdMedications: {
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

module.exports = router;
