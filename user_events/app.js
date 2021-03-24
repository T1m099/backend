const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');

const eventTypes = require('./routes/eventTypes');
const settings = require('./routes/settings');
const medications = require('./routes/medications');




//Initialize App
const app = express();


//Initialize Passport
require ('./authentification/passport')(passport);
app.use(passport.initialize());
app.use(express.json());

//connect mongoose
mongoose
    .connect(
        "mongodb://user_events_db",{ useNewUrlParser: true,useUnifiedTopology: true}
    )
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


//routes
app.use(express.json({type: "application/json"}));
app.use('/event', eventTypes);
app.use('/settings', settings);
app.use('/medications', medications);






//secured test route
app.get('/', passport.authenticate('jwt',{session: false}), (req, res, next) => {
    res.send('Hello World, it works (at least on my machine)');
});


console.log("Hello World, die App ist auf 80");
 app.listen(80);