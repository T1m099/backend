const express = require('express');
const app = express();

app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World, it works (at least on my machine) Ich raste hier gleich richtig aus ');
});

app.get('/login', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

console.log("sdfsgsdfgdsrfvlkhsaelfiu vaherqohfpeqidov dpfogh!!!!!!!");


app.listen(80);