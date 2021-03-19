const express = require('express');
const Medication = require('./Models/medications');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/medication/all', (req, res) => {
    Medication.find()
        .select("_id name description number")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                courses: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        description: doc.description,
                        number: doc.number,
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


router.post('/medication', (req, res) => {

    const medications = new Medication({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        number: req.body.number,

    })
    medications.save().then((result) => {
        console.log(result)
            .catch(err => console.log(err));
        res.status(201).json({
            message: 'Entry was successfully',
            createdMedications: {
                name: result.name,
                description: result.description,
                number: result.number,
                request: {
                    type: 'GET',
                    url: ''.result._id
                }
            }
        });
    });
});
router.get("/medication/id", (req, res) => {
    const id = req.params.medicationId;
    Medication.findById(id)
        .exec()
        .then(doc => {
            console.log("From Database", doc);
            if (doc) {
                res.status(200).json({doc});
            } else {
                res.status(404).json({message: 'No valid entry found for provides ID'});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});


module.exports = router;
