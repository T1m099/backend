const mongoose = require('mongoose');
//import mongoose from 'mongoose'

const { Schema } = mongoose;

//schema for the files a user can upload
const FileSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},

	user_id: {
		type: String,
		required: true,
	},

	file: {
		type: String,
		required: true,
	},

	timestamp: {
		type: Number,
		required: true,
	},
	parentId: {
		type: String,
		required: true,
	},
	size: { type: Number },
});
module.exports = mongoose.model('File', FileSchema);
