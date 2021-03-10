const express = require('express');
const mongoose = require('mongoose');
const Medication = require('./Models/medications');

const app = express();
app.use(express.json({type:"application/json"}));
mongoose
    .connect(
        'mongodb://user_db/',{ useNewUrlParser: true,useUnifiedTopology: true}
    )
    .then(() =>  console.log('Mongo connected'))
    .catch(err => console.log(err));



app.get('/', (req, res) => {
    res.send('Hello World, it works (at least on my machine)')
});

app.get( '/db2', (req, res) => {
     Medication.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


app.post('/db',(req, res) =>{
    //console.log("Das hier ist ein gigantisch grosser satz, dami wir den auch richtig shene können");
    //console.log(req);
    const medications = new Medication({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        number: req.body.number,

})
    medications.save().then((result )=> {
        console.log(result);
    })
        .catch(err =>console.log(err));
    res.status(201).json({
        message: 'Handling POST requests to /medications',
        createdMedication: medications
    });
});

app.get("/db1", (req, res) => {
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
