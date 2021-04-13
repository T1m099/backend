const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const file = require('./routes/file');
const events = require('./routes/events');
const medications = require('./routes/medications');
const folders = require('./routes/folders');
const initErrorHandling = require('./errorHandling/initErrorHandling')
//Initialize App
const app = express();

//Initialize Passport
require('./authentification/passport')(passport);
app.use(passport.initialize());
//change body-size limit of express for fileupload
app.use(express.json({limit: '40mb'}));
require('dotenv').config();

//connect mongoose
mongoose
	.connect('mongodb://user_events_db', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('MongoDB connected'))
	.catch(err => console.log(err));

//routes
app.use(express.json({ type: 'application/json' }));
app.use('/events', events);
app.use('/medications', medications);
app.use('/files', file);
app.use('/folders', folders);
initErrorHandling();


console.log('Hello World, die App ist auf 80');
app.listen(80);
