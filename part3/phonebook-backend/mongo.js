const mongoose = require('mongoose');

if (process.argv.length < 3) {
	console.log('Please provide the password as an argument: node mongo.js <password>');
	process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@phonebook.fpawj.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url);

const phoneShema = new mongoose.Schema({
	name: String,
	date: Date,
	number: String,
});

const Phone = mongoose.model('Phone', phoneShema);
const person = new Phone({
	name: process.argv[3],
	date: new Date(Date.now()),
	number: process.argv[4],
});

const addNewPhone = (person) => {
	return person.save().then((result) => {
		console.log(`phone saved!`);
		mongoose.connection.close();
	});
};
const display = (phones) => {
	console.log(phones);
	console.log('phonebook: \n');
	phones.forEach((person) => {
		console.log(`${person.name} ${person.number}`);
	});
	return;
};
const query = {};
const projection = { __v: 0 };
let getAllQuery = [query, projection];
const showAll = () => {
	return Phone.find({}).then((phones) => {
		display(phones);
		mongoose.connection.close();
	});
};

switch (process.argv.length) {
	case 3:
		showAll();

		break;
	case 5:
		addNewPhone(person);
		break;
	default:
		console.log(
			'Please pass person as an argument : node mongo.js <yourpassword> <person name> <person number>',
		);
		mongoose.connection.close();
		process.exit(1);
}
