const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');

const events = require('./routes/events');
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
app.use('/events', events);
app.use('/settings', settings);
app.use('/medications', medications);


console.log("Hello World, die App ist auf 80");
 app.listen(80);