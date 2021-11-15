const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const logger = require('../utils/logger');
const middleware = require('../utils/middleware');
// @route GET api/blogs/
// @decs get all blog posts
// @access public
blogsRouter.get('/', async (request, response) => {
	const result = await Blog.find({}).populate('user', { username: 1, name: 1 });
	response.json(result);
});
// @route POST api/blogs/
// @decs Create new blog
// @access public
blogsRouter.post('/', middleware.tokenExtractor, async (request, response) => {
	if (!request.userId) {
		return response.status(401).json({ error: 'token missing or invalid' });
	}
	const blog = new Blog(request.body);
	//console.log(blog);
	if (!blog.likes) {
		blog.likes = 0;
	}
	try {
		const user = await User.findById(request.userId);
		blog.user = request.userId;
		let savedblog = await blog.save();
		//console.log(user, savedblog);
		user.blogs = user.blogs.concat(savedblog.id);
		await user.save();
		response.status(201).json({ success: true, savedblog });
	} catch (err) {
		//console.log(err);
		response.status(400).json({ success: false, message: err });
	}
}); //4.17 //4.19
// @route DELETE api/blogs/:id
// @decs Implement functionality for deleting a single blog post resource.
//		Use the async/await syntax. Follow RESTful conventions when defining the HTTP API.
// @access public
blogsRouter.delete('/:id', middleware.tokenExtractor, async (request, response) => {
	if (!request.userId) {
		return response.status(401).json({ error: 'token missing or invalid' });
	}
	try {
		const user = await User.findById(request.userId);

		const blogId = request.params.id;
		if (!blogId) {
			return response
				.status(400)
				.json({ message: 'Invalid blog ID', success: false });
		}
		//logger.info(blogId);
		let blog = await Blog.findById({ _id: blogId });
		console.log(blog, user);
		if (blog.user.toString() === user.id.toString()) {
			await Blog.findByIdAndRemove(blogId);
			response.status(204).end();
		} else {
			response.status(401).json({
				error: 'You are not authorized to delete this blog',
			});
		}
	} catch (error) {
		console.log(error);
		return response.status(401).json({ error: 'token missing or invalid' });
	}
}); //4.13 4.21
// @route PUT api/blogs/:id
// @decs Implement functionality for updating the information of an individual blog post.
// @access public
blogsRouter.put('/:id', async (req, res) => {
	if (!req.params.id && !req.body.likes)
		return res.status(422).json({
			succeed: false,
			message: 'Cannot update this blog. Check your update content!',
		});

	Blog.findByIdAndUpdate({ _id: req.params.id }, { likes: req.body.likes })
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
}); //4.14

module.exports = blogsRouter;
