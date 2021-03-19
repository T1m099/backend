const mongoose = require('mongoose')
//import mongoose from 'mongoose'

const {Schema} = mongoose;


const reminderSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    time: {
        type: Date,
        required: true
    }
    //ids are missing -->Add
});


module.exports = mongoose.model('Reminder', reminderSchema)
