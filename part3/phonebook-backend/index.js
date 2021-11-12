require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const Phone = require('./models/phone');
const cors = require('cors');

morgan.token('body', function (req) {
	return JSON.stringify(req.body);
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(cors());
app.use(express.json());
app.use(express.static('build'));
app.use(morgan('tiny'));
app.get('/', (req, res) => {
	res.send(
		'Cái này là backend cho một web front-end khác. Cái này build bằng nodejs :))))))). thêm /api/persons để xem ',
	);
});

// @route GET api/persons
// @decs get list of phones
// @access public
app.get('/api/persons', (req, res) => {
	Phone.find({})
		.then((phones) => {
			//console.log(phones);
			return res.json({ succeed: true, phones });
		})
		.catch((err) => {
			console.error(err);
			return res
				.status(500)
				.json({ succeed: false, message: 'Internal server error' });
		});
});

// @route GET api/persons/:id
// @decs get single phone
// @access public
app.get('/api/persons/:id', (req, res) => {
	Phone.findOne({ _id: req.params.id })
		.then((phones) => {
			return res.json({ succeed: true, phones });
		})
		//.catch((err) => next(err));
		.catch((err) => {
			console.error(err);
			return res
				.status(400)
				.json({ succeed: false, message: 'Number Not Found' });
		});
});

// @route POST api/persons/create
// @decs create a new  phone
// @access public
app.post('/api/persons/create', async (req, res) => {
	let person = req.body;
	//console.log(person);
	if (person.name && person.number) {
		Phone.findOne({ name: person.name })
			.then((phone) => {
				let check = !!phone;
				if (check) {
					return res.status(422).json({
						succeed: false,
						message: `${person.name} is already existing`,
					});
				} else {
					//console.log('create new');
					const phone = new Phone({
						name: person.name,
						number: person.number,
						date: Date(Date.now()),
					});
					//console.log('save 80');
					phone.save()
						.then((savedPhone) => {
							//console.log('create new');
							return res.json({
								succeed: true,
								savedPhone,
							});
						})
						.catch((err) => {
							console.log('error :', err);
							//console.log('catch 88 block');
							return res.status(500).json({
								succeed: false,
								message: `Internal server error : ${err}`,
							});
						});
				}
			})
			.catch((err) => {
				console.log(err);
				return res.status(500).json({
					succeed: false,
					message: `Internal server error : ${err}`,
				});
			});
	} else {
		return res.status(400).json({ succeed: false, message: 'bad request' });
	}
});
// @route DELETE api/persons/:id
// @decs delete single phone
// @access public
app.delete('/api/persons/:id', async (req, res) => {
	let id = req.params.id;
	//console.log(id);
	try {
		Phone.deleteOne({ _id: id })
			.then((result) => {
				//console.log(result);
				return res.json({
					succeed: true,
					result,
				});
			})
			.catch((err) => {
				console.log(err);
				return res.status(500).json({
					succeed: false,
					message: `Internal server error : ${err}`,
				});
			});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			succeed: false,
			message: `Internal server error : ${err}`,
		});
	}
});

// @route PATCH api/persons/:id
// @decs update the specified phone
// @access public
app.patch('/api/persons/:id', (req, res) => {
	if (!req.params.id && !req.body.number)
		return res.status(422).json({
			succeed: false,
			message: 'Cannot update this person. Check your update content!',
		});
	Phone.updateOne({ _id: req.params.id }, { number: req.body.number })
		.then((result) => {
			return res.status(200).json({ succeed: true, result });
		})
		.catch((err) => {
			console.log(err);
			return res.status(500).json({
				succeed: false,
				message: `Internal server error : ${err}`,
			});
		});
});
// @route PUT api/persons/:id
// @decs update the specified phone
// @access public
app.put('/api/persons/:id', (req, res) => {
	if (!req.params.id && !req.body.number && !req.body.name)
		return res.status(422).json({
			succeed: false,
			message: 'Cannot update this person. Check your update content!',
		});
	Phone.findByIdAndUpdate(
		{ _id: req.params.id },
		{ name: req.body.name, number: req.body.number },
	)
		.then((result) => {
			return res.status(200).json({ succeed: true, result });
		})
		.catch((err) => {
			console.log(err);
			return res.status(500).json({
				succeed: false,
				message: `Internal server error : ${err}`,
			});
		});
});

app.get('/info', (req, res, next) => {
	let date = Date(Date.now()).toString();

	Phone.countDocuments({})
		.then((count) => {
			res.send(
				`<p>Phonebook has info for ${count} people</p><br/><p>${date}</p>`,
			);
		})
		.catch((err) => next(err));
});
//3.13
const errorHandler = (error, request, response, next) => {
	console.error(error.message);

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' });
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message });
	}

	next(error);
};

app.use(errorHandler);
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log('Example app listening on port port!');
});
