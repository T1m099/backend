const express = require('express');
const mongoose = require('mongoose');
const login = require('./routes/login');
const register = require('./routes/register');
const getUser = require('./routes/getUser');
require('dotenv').config();


//build the app
const app = express();

//init app
app.use(express.json({type: 'application/json'}));
app.use('/login', login);
app.use('/register', register);
app.use('/getUser', getUser);


//connect to DB
mongoose
    .connect(
        "mongodb://user_db",{ useNewUrlParser: true, useUnifiedTopology: true}
    )
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.listen(80);
console.log("The app is running")