const express = require('express');
const mongoose = require('mongoose');
const calendar = require('./routes/calendar');
const courses = require('./routes/courses');
const daysymptom = require('./routes/daysymptom');
const medication = require('./routes/medications');
const reminder = require('./routes/reminder');
const symptom = require('./routes/symptom');

//build the App
const app = express();
//default node.js implementation of mongoose
mongoose.Promise = global.Promise;
//initializes the App
app.use(express.json({type: "application/json"}));
app.use('/calendar', calendar);
app.use('/courses', courses);
app.use('/daysymptom', daysymptom);
app.use('/medications', medication);
app.use('/reminder', reminder);
app.use('/symptom', symptom);

mongoose
    .connect(
        'mongodb://user_db/test', {useNewUrlParser: true, useUnifiedTopology: true}
    )
    .then(() => console.log('Mongo connected'))
    .catch(err => console.log(err));


app.get('/', (req, res) => {
    res.send('Hello World, it works (at least on my machine)')
});

console.log("Hello World, die App ist auf 80")
app.listen(80);
