const express = require('express');
const mongoose = require('mongoose');


const {Schema} = mongoose;

const MedicationSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    //unit: Decimal128,
    number: Number
    //UID:
});

module.exports = mongoose.model('Medication', MedicationSchema)









