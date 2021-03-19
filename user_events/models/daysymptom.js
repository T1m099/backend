const mongoose = require('mongoose')
//import mongoose from 'mongoose'

const {Schema} = mongoose;

const DaysymptomSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    severity: Number,
});


module.exports = mongoose.model('Daysymptom', DaysymptomSchema)
