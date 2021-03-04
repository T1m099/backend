const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World, it works (at least on my machine)')
});

console.log("Hello World, die App ist auf 80")
 app.listen(80);