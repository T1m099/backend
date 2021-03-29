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

    tracking:Object,

    user_id:{
        type: String,
        required:true
    }

});
module.exports = mongoose.model('Events', EventTypeSchema)
