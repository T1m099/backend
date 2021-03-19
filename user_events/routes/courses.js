const express = require('express');
const Courses = require('./Models/courses');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/courses', (req, res) => {
    Courses.find()
        .select("_id date")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                courses: docs.map(doc => {
                    return {
                        _id: doc._id,
                        date: doc.date,
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


router.post('/courses/entry', (req, res) => {

    const courses = new Courses({
        _id: new mongoose.Types.ObjectId(),
        date: req.body.date,
    })
    courses.save().then((result) => {
        console.log(result)
            .catch(err => console.log(err));
        res.status(201).json({
            message: 'Entry was successfully',
            createdCourses: {
                date: result.date,
                request: {
                    type: 'GET',
                    url: ''.result._id
                }
            }
        });
    });
});

module.exports = router;
