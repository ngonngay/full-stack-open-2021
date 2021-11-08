const express = require('express');
const app = express();
const morgan = require('morgan');
const { nanoid } = require('nanoid');
const cors = require('cors');
let persons = [
	{
		id: 1,
		name: 'Arto Hellas',
		number: '040-123456',
	},
	{
		id: 2,
		name: 'Ada Lovelace',
		number: '39-44-5323523',
	},
	{
		id: 3,
		name: 'Dan Abramov',
		number: '12-43-234345',
	},
	{
		id: 4,
		name: 'Mary Poppendieck',
		number: '39-23-6423122',
	},
	{
		id: 5,
		name: 'Mary Poppendieck',
		number: '39-23-6423122',
	},
	{
		id: 6,
		name: 'Mary Poppendieck',
		number: '39-23-6423122',
	},
	{
		id: 7,
		name: 'Mary Poppendieck',
		number: '39-23-6423122',
	},
	{
		id: 8,
		name: 'Mary Poppendieck',
		number: '39-23-6423122',
	},
	{
		id: 9,
		name: 'thang',
		number: '39-23-6423122',
	},
];
morgan.token('body', function (req, res) {
	return JSON.stringify(req.body);
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
	res.send(
		'Cái này là backend cho một web front-end khác. Cái này build bằng nodejs :))))))). thêm /api/persons để xem ',
	);
});
app.get('/api/persons', (req, res) => {
	res.json(persons);
});

//app.use(morgan('tiny'));
app.get('/api/persons/:id', (req, res) => {
	let id = Number(req.params.id);
	let person = persons.find((person) => {
		//console.log(person.id, typeof person.id, id, typeof id);
		return person.id === id;
	});
	//console.log(typeof person);
	person ? res.json(person) : res.status(404).json('Not Found');
});
app.delete('/api/persons/:id', (req, res) => {
	let id = Number(req.params.id);
	//console.log(id);
	persons = persons.filter((person) => {
		return person.id !== id;
	});
	console.log(persons);
	return res.status(200).json({ message: 'succeed' });
});
app.get('/info', (req, res) => {
	let date = Date(Date.now()).toString();
	res.send(`<p>Phonebook has info for ${persons.length} people</p><br/><p>${date}</p>`);
});
const checkExisting = (name) => {
	return persons.map((person) => person.name).includes(name);
};
app.post('/api/persons/create', (req, res) => {
	let person = req.body;
	if (person.name && person.number) {
		if (checkExisting(person.name)) {
			return res
				.status(422)
				.json({ message: `${person.name} is already existing` });
		}
		let newPerson = { id: nanoid(), name: person.name, number: person.number };
		persons = [...persons.concat(newPerson)];
		return res.json(newPerson);
	}
	return res.status(400).json({ message: 'bad request' });
});
app.patch('/api/persons/:id', (req, res) => {
	let result = persons.find((person) => {
		return person.id == req.params.id && (person.number = req.body.number);
	});
	//console.log(result);
	return result
		? res.status(200).json(result)
		: res.status(402).json({ message: 'Cannot update this person' });
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log('Example app listening on port port!');
});

//Run app, then load http://localhost:port in a browser to see the output.
