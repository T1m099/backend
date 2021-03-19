const express = require('express');
const Daysymptom = require('./Models/daysymptom');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/daysymptom/all', (req, res) => {
    Daysymptom.find()
        .select("_id severity")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                daysymptom: docs.map(doc => {
                    return {
                        _id: doc._id,
                        severity: doc.severity,
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


router.post('/daysymptom', (req, res) => {

    const daysymptom = new Daysymptom({
        _id: new mongoose.Types.ObjectId(),
        severity: req.body.severity,

    })
    daysymptom.save()
        .then((result) => {
            console.log(result)
                .catch(err => console.log(err));
            res.status(201).json({
                message: 'Entry was successfully',
                createdDaysymptom: {
                    severity: result.severity,
                    request: {
                        type: 'GET',
                        url: ''.result._id
                    }
                }
            });
        });
});

module.exports = router;
