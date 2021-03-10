const express = require('express');
const mongoose = require('mongoose')
import mongoose from 'mongoose'

const {Schema} = mongoose;

const CalendarSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    starttime: Date,
    endtime: Date,
    title: String,
    description: String,
    colour: String,
//UID
});
module.exports = mongoose.model('Calendar', CalendarSchema)
