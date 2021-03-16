const express = require('express');
const mongoose = require('mongoose');
const login = require('./routes/login');
const register = require('./routes/register');
require('dotenv').config()

//build the app
const app = express();


//init app
app.use(express.json({type: 'application/json'}));
app.use('/login', login);
app.use('/register', register);

//connect to DB
mongoose
    .connect(
        process.env.MONGO_DB,{ useNewUrlParser: true,useUnifiedTopology: true}
    )
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

//umegebungsvariablen: einfach das secret rein, und dann das so einrichten, dass jedes mal die Werte
//für die Keys dort neu generiert werden
//2 login endpoints, die mit den username und passwort, bzw. den hash akzeptiert
app.listen(80);