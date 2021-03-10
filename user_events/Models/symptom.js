const express = require('express');
const mongoose = require('mongoose')
import mongoose from 'mongoose'

const {Schema} = mongoose;

const SymptomSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String
});





module.exports = mongoose.model('Symptoms', SymptomSchema)


