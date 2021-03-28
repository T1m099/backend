const mongoose = require('mongoose')
//import mongoose from 'mongoose'

const {Schema} = mongoose;

const EventTypeSchema = new Schema({
    type:{
      type: String,
      required: true
    },

    markingColor:{
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    notes:{
        type: String,
        required: true
    },

    start:{
        type: Date,
        required: true
    },

    end: {
        type: Date
    },

   reminders:[],

   disease: String,

    symptoms:[],

    mood: String,

    tracking: Object,

    user_id:{
        type: String,
        required:true
    }

});
module.exports = mongoose.model('EventTypes', EventTypeSchema)
