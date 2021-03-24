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
                    return {
                        _id: doc._id,
                        type: doc.type,
                        markingColor: doc.markingColor,
                        title: doc.title,
                        notes: doc.notes,
                        start: doc.start,
                        end: doc.end,
                        reminders: doc.reminders,
                        disease: doc.disease,
                        symptoms: doc.symptoms,
                        mood: doc.mood,
                        tracking: doc.tracking
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
    const eventType = new EventTypes({
        _id: new mongoose.Types.ObjectId(),
        type: req.body.type,
        markingColor: req.body.markingColor,
        title: req.body.title,
        notes: req.body.notes,
        start: req.body.start,
        end: req.body.end,
        reminders: req.body.reminders,
        disease: req.body.disease,
        symptoms: req.body.symptoms,
        mood: req.body.mood,
        tracking: req.body.tracking,
        user_id: req.user._id
    })
    eventType.save()
        .then((result) => {
            console.log(result)
            res.status(201).json({
                message: 'created',
                createdCalendar: {
                    _id: result._id,
                    type: result.type,
                    markingColor: result.markingColor,
                    title: result.title,
                    notes: result.notes,
                    start: result.start,
                    end: result.end,
                    reminders: result.reminders,
                    disease: result.disease,
                    symptoms: result.symptoms,
                    mood: result.mood,
                    tracking: result.tracking,
                }
            });
        })
        .catch(err => console.log(err));
})

module.exports = router

