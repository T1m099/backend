const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB
mongoose
    .connect(
        'mongodb://user_db/test'
    )
    .then(() => console.log('MongoDB Connected loloolloolloolloollloollolloo'))
    .catch(err => console.log(err));


app.get('/', (req, res) => {
    res.send('Hello World, it works (at least on my machine)')
});

console.log("Hello World, die App ist auf 80")
app.listen(80);