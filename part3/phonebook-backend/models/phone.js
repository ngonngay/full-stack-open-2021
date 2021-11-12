const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongoose.connect(url)
	.then(() => {
		console.log('connected to MongoDB');
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message);
	});

const phoneSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true, minlength: 3 },
	number: { type: String, required: true, minlength: 8 },
	date: Date,
});
phoneSchema.plugin(uniqueValidator);
phoneSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('Phone', phoneSchema);
