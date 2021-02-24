const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello Wolrd, it works (at least on my machine)')
});


 app.listen(8080);