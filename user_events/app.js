const express = require('express');
const passport = require('passport');

//Initialize App
const app = express();


//Initialize Passport
require ('./authentification/passport')(passport);
app.use(passport.initialize());
app.use(express.json());


app.get('/', passport.authenticate('jwt',{session: false}), (req, res) => {
    res.send('Hello World, it works (at least on my machine)');
});

console.log("Hello World, die App ist auf 80");
 app.listen(80);