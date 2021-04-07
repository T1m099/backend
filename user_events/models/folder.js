const mongoose = require('mongoose');
const { Schema } = mongoose;

const FolderSchema = new Schema({
	name: {
		type: String,
		required: true,
	},

	user_id: {
		type: String,
		required: true,
	},

	parentId: {
		type: String,
		required: true,
	},
});
module.exports = mongoose.model('Folder', FolderSchema);
