const mongoose = require('mongoose')
//import mongoose from 'mongoose'

const {Schema} = mongoose;

const SymptomSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
});


module.exports = mongoose.model('Symptoms', SymptomSchema)


