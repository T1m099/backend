const express = require('express');
const mongoose = require('mongoose')
import mongoose from 'mongoose'

const {Schema} = mongoose;


const reminderSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    time: Date,
    //ids are missing -->Add
});




module.exports = mongoose.model('Reminder', ReminderSchema)
