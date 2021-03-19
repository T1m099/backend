const express = require('express');
const Calendar = require('./Models/calendar');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/calendar/entries', (req, res) => {
    Calendar.find()
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
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/calendar', (req, res) => {
    const calendar = new Calendar({
        _id: new mongoose.Types.ObjectId(),
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        title: req.body.title,
        description: req.body.description,
        colour: req.body.colour,

    })
    calendar.save()
        .then((result) => {
            console.log(result)
                .catch(err => console.log(err));
            res.status(201).json({
                message: 'Entry was successfully',
                createdCalendar: {
                    start_time: result.start_time,
                    end_time: result.end_time,
                    title: result.title,
                    description: result.description,
                    colour: result.colour,
                    request: {
                        type: 'GET',
                        url: ''.result._id
                    }
                }
            });
        });
})

module.exports = router

