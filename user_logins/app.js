const express = require('express');
const mongoose = require('mongoose');


//build the app
const app = express();


//init app
app.use(express.json({type: 'application/json'}));
app.use('./routes/login');
app.use('./routes/register');

//connect to DB
mongoose
    .connect(
        'mongodb://user_db/test',{ useNewUrlParser: true,useUnifiedTopology: true}
    )
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


//2 login endpoints, die mit den username und passwort, bzw. den hash akzeptiert
app.listen(80);