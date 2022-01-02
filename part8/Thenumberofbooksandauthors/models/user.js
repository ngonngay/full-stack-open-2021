const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		minlength: 3,
	},
	favoriteGenre: {
		type: String,
		required: true,
	},
});
userSchema.plugin(uniqueValidator);
userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
		// the passwordHash should not be revealed
		delete returnedObject.passwordHash;
	},
});
module.exports = mongoose.model('User', userSchema);
