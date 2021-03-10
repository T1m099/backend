const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Medication = require('./Models/medications');

mongoose
    .connect(
        'mongodb://user_db/test',{ useNewUrlParser: true,useUnifiedTopology: true}
    )
    .then(() => console.log('MongoDB connected '))
    .catch(err => console.log(err));



app.get('/', (req, res) => {
    res.send('Hello World, it works (at least on my machine)')
});

app.get("/db", (req, res, next) => {
    Medication.find()
        .exec()
        .then(docs => {
            console.log(docs);
            //if(docs.length >= 0) {
            res.status(200).json(docs);
            // } else {
            //   res.status(404).json({
            //      message: 'No entries found'
            //   });
            // }

        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


app.post('/db',(req, res, next) =>{
    const medications = new Medication({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        number: req.body.number,
    })
    medications.save().then(result => {
        console.log(result);
    })
        .catch(err =>console.log(err));
    res.status(201).json({
        message: 'Handling POST requests to /medications',
        createdMedication: medications
    });
});

app.get("/db", (req, res, next) => {
    const id = req.params.medicationId;
    Medication.findById(id)
        .exec()
        .then(doc =>{
            console.log("From Database", doc);
            if(doc){
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

console.log("Hello World, die App ist auf 80")
 app.listen(80);
