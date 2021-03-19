const express = require('express');
const Reminder = require('./Models/reminder');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/reminder/all', (req, res) => {
    Reminder.find()
        .select("_id time")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                courses: docs.map(doc => {
                    return {
                        _id: doc._id,
                        time: doc.time,
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


router.post('/reminder', (req, res) => {

    const reminder = new Reminder({
        _id: new mongoose.Types.ObjectId(),
        time: req.body.time,

    })
    reminder.save().then((result) => {
        console.log(result)
            .catch(err => console.log(err));
        res.status(201).json({
            message: 'Entry was successfully',
            createdReminder: {
                name: result.name,
                request: {
                    type: 'GET',
                    url: ''.result._id
                }
            }
        });
    });

});


module.exports = router;
