const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/Blog');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
morgan.token('body', function (req) {
	return JSON.stringify(req.body);
});
// eslint-disable-next-line no-undef
const url = config.MONGODB_URI;

logger.info('connecting to', url);

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
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.use('/api/blogs', blogsRouter);

app.use(middleware.requestLogger);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
