const mongoose = require('mongoose')
//import mongoose from 'mongoose'

const {Schema} = mongoose;


//schema for all calendar events: that is appointments (doctor/therapy or private), mood tracking, symptom tracking,
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
    },

    time:{
        type: Number,
        required: true
    },

    end: {
        type: Number
    },

    reminders:{type:Array,default:undefined},

   disease: String,

    symptoms:{type:Array,default:undefined},

    mood: String,

    trackingItems:Object,

    user_id:{
        type: String,
        required:true
    }

});
module.exports = mongoose.model('Events', EventTypeSchema)
