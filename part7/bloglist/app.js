const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/Blog');
const usersRouter = require('./controllers/User');
const loginRouter = require('./controllers/Login');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
require('express-async-errors');
// morgan.token('body', function (req) {
// 	return JSON.stringify(req.body);
// });
// eslint-disable-next-line no-undef
const url = config.MONGODB_URI;

//logger.info('connecting to', url);

mongoose.connect(url)
	.then(() => {
		console.log('connected to MongoDB');
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message);
	});

app.use(cors());
app.use(express.json());
app.use(express.static('build'));
//app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(middleware.requestLogger);

app.use('/api/blogs', middleware.tokenExtractor, blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
if (process.env.NODE_ENV === 'test') {
	const testingRouter = require('./controllers/testing');
	app.use('/api/testing', testingRouter);
}
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
module.exports = app;
