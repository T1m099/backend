const mongoose = require('mongoose')
//import mongoose from 'mongoose'

const {Schema} = mongoose;

const CourseSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    //sid
    date: {
        type: Date,
        required: true
    }
    //ui
});

module.exports = mongoose.model('Course', CourseSchema)
