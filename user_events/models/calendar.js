const mongoose = require('mongoose')
//import mongoose from 'mongoose'

const {Schema} = mongoose;

const CalendarSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    start_time: {
        type: Date,
        required: true
    },
    end_time: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    colour: {
        type: String,
    },
    user_id:{
        type: String,
        required:true
    }

});
module.exports = mongoose.model('Calendar', CalendarSchema)
