const { Schema } = require('mongoose');

const FolderSchema = new Schema({
	name: {
		type: String,
		required: true,
	},

	user_id: {
		type: String,
		required: true,
	},

	parent_id: {
		type: String,
		required: true,
	},
});
module.exports = mongoose.model('Folder', FileSchema);
