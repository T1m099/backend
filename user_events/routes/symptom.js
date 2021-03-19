const express = require('express');
const Symptom = require('./Models/symptom');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/symptom/list', (req, res) => {
    Symptom.find()
        .select("_id name description")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                courses: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        description: doc.description,
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


router.post('/symptom', (req, res) => {

    const symptom = new Symptom({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,

    })
    symptom.save().then((result) => {
        console.log(result)
            .catch(err => console.log(err));
        res.status(201).json({
            message: 'Entry was successfully',
            createdSymptom: {
                name: result.name,
                description: result.description,
                request: {
                    type: 'GET',
                    url: ''.result._id
                }
            }
        });
    });
});

module.exports = router;
