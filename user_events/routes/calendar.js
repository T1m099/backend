const express = require('express');
const Calendar = require('../models/calendar');
const mongoose = require('mongoose');
const passport = require('passport');


const router = express.Router();

router.get('/entries', passport.authenticate('jwt',{session: false}), (req, res) => {
    Calendar.find({user_id: req.user._id})
        .select("_id start_time end_time title description colour")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                calendar: docs.map(doc => {
                    return {
                        _id: doc._id,
                        start_time: doc.start_time,
                        end_time: doc.end_time,
                        title: doc.title,
                        description: doc.description,
                        colour: doc.colour,
                        request: {
                            type: 'GET',
                            url: '' + doc._id
                        }
                    }
                })
            }
            res.status(201).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/entry', passport.authenticate('jwt',{session: false}), (req, res) => {
    const calendar = new Calendar({
        _id: new mongoose.Types.ObjectId(),
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        title: req.body.title,
        description: req.body.description,
        colour: req.body.colour,
        user_id: req.user._id
    })
    calendar.save()
        .then((result) => {
            console.log(result)
            res.status(201).json({
                message: 'created',
                createdCalendar: {
                    start_time: result.start_time,
                    end_time: result.end_time,
                    title: result.title,
                    description: result.description,
                    colour: result.colour,
/*                    request: {
                        type: 'GET',
                        url: ''.result._id
                    }*/
                }
            });
        })
        .catch(err => console.log(err));
})

module.exports = router

