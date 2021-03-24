const express = require('express');
const mongoose = require('mongoose');
const login = require('./routes/login');
const register = require('./routes/register');
const getUser = require('./routes/getUser');
const refresh = require('./routes/refresh');
require('dotenv').config();


//build the app
const app = express();

//init app
app.use(express.json({type: 'application/json'}));
app.use('/login', login);
app.use('/register', register);
app.use('/getUser', getUser);
app.use('/refresh', refresh);



//connect to DB
mongoose
    .connect(
        "mongodb://user_db",{ useNewUrlParser: true,useUnifiedTopology: true}
    )
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

//umegebungsvariablen: einfach das secret rein, und dann das so einrichten, dass jedes mal die Werte
//für die Keys dort neu generiert werden
//2 login endpoints, die mit den username und passwort, bzw. den hash akzeptiert
app.listen(80);
console.log("The app is running")
//hash vom Pw mitgeben und dann eine Schnittstelle zum refreshen mit dem Hash