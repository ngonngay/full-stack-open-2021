const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const logger = require('../utils/logger');

// @route Create api/users/
// @decs Implement functionality for creating new user.
// @access public
usersRouter.post('/', async (request, response) => {
	const body = request.body;
	const saltRounds = 10;
	// console.log(body.password, body.username);
	// console.log(!!!body.password || !!!body.username);
	if (!body.password || !body.username) {
		return response.status(400).json({
			success: false,
			error: 'Username and Password required',
		});
	} else if (body.password.length < 3 || body.username.length < 3) {
		return response.status(400).json({
			success: false,
			error: 'Username and Password  must be at least 3 charactor',
		});
	}
	const passwordHash = await bcrypt.hash(body.password, saltRounds);

	const user = new User({
		username: body.username,
		name: body.name,
		passwordHash,
		blogs: [],
	});
	try {
		const savedUser = await user.save();

		response.json(savedUser);
	} catch (error) {
		if (error.code === 11000) {
			console.log(JSON.stringify(error.keyValue));
			return response.status(400).json({
				success: false,
				error: `E11000: Duplicate key error for ${JSON.stringify(
					error.keyValue,
				)}`,
			});
		}
		response.status(400).json({ success: false, error });
	}
}); //4.15 //4.16 //4.17
// @route Get  api/users/
// @decs get all user information
// @access public
usersRouter.get('/', async (request, response) => {
	let users = await User.find({}).populate('blogs');
	response.json({ success: true, users });
}); //4.15
module.exports = usersRouter;
