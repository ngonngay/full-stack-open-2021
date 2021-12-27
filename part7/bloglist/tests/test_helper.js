const Blog = require('../models/blog');
const User = require('../models/user');
const usersInDb = async () => {
	const users = await User.find({});
	return users.map((u) => u.toJSON());
};
const initialBlogs = [
	{
		title: 'HTML is easy',
		author: 'yandere',
		url: 'https://fullstackopen.com/en/part4/testing_the_backend#test-environment',
		likes: 7,
	},
	{
		title: 'HTML is easy',
		author: 'ngonngay',
		url: 'https://fullstackopen.com/en/part4/testing_the_backend#test-environment',
		likes: 6,
	},
];

const nonExistingId = async () => {
	const blog = new Blog({
		title: 'HTML is easy',
		author: 'yandere',
		url: 'https://fullstackopen.com/en/part4/testing_the_backend#test-environment',
		likes: 7,
	});
	await blog.save();
	await blog.remove();

	return blog._id.toString();
};

const blogsInDb = async () => {
	const blogs = await Blog.find({});
	return blogs.map((blog) => blog.toJSON());
};
const lastBlog = async () => {
	const blogs = await Blog.find({});
	return blogs[blogs.length - 1];
};

module.exports = {
	initialBlogs,
	nonExistingId,
	blogsInDb,
	lastBlog,
	usersInDb,
};
