const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const bcrypt = require('bcrypt');
const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
	await Blog.deleteMany({});
	// await User.deleteMany({});
	let blogObject = new Blog(helper.initialBlogs[0]);
	await blogObject.save();
	blogObject = new Blog(helper.initialBlogs[1]);
	await blogObject.save();
	// userObject = new User(helper.initialUser);
	// await userObject.save();
});
describe(' HTTP GET request to the /api/blogs url', () => {
	//4.8
	test('blogs are returned as json', async () => {
		let response = await api.get('/api/blogs');
		expect(response.status).toBe(200);
		//console.log(response.headers);
		expect(response.headers['content-type']).toMatch(/application\/json/);
	});
	test('all blogs are returned', async () => {
		const response = await api.get('/api/blogs');
		expect(response.body).toHaveLength(helper.initialBlogs.length);
	});

	test('a specific blog is within the returned blogs', async () => {
		const response = await api.get('/api/blogs');
		const authors = response.body.map((r) => r.author);
		expect(authors).toContain('yandere');
	});
	test('verifies that the unique identifier property of the blog posts is named id', async () => {
		const response = await api.get('/api/blogs');
		expect(response.body[0].id).toBeDefined();
	}); //4.9
});
describe('Making an HTTP POST request to the /api/blogs url successfully', () => {
	let token = null;

	beforeAll(async () => {
		await User.deleteMany({});

		const passwordHash = await bcrypt.hash('password', 10);
		const user = new User({ username: 'jane', name: 'thang', passwordHash });

		await user.save();

		// Login user to get token
		await api
			.post('/api/login')
			.send({ username: 'jane', password: 'password' })
			.then((res) => {
				return (token = res.body.token);
			});

		return token;
	});

	test('a valid blog can be added', async () => {
		const newBlog = {
			title: 'HTML is easy',
			author: 'yandere 2',
			url: 'https://fullstackopen.com/en/part4/testing_the_backend#test-environment',
			likes: 7,
		};
		//console.log(token);
		const response = await api
			.post('/api/blogs')
			.set('Authorization', `bearer ${token}`)
			.send(newBlog);
		expect(response.status).toBe(201);
		//console.log(response.headers);
		expect(response.headers['content-type']).toMatch(/application\/json/);
		const blogsAtEnd = await helper.blogsInDb();

		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

		const contents = blogsAtEnd.map((n) => n.author);

		expect(contents).toContain('yandere 2');
	}); //4.10 //4.23
	test('the likes property is missing from the request, it will default to the value 0', async () => {
		const newBlog = {
			title: 'the likes property is missing from the request',
			author: 'yandere 2',
			url: 'https://fullstackopen.com/en/part4/testing_the_backend#test-environment',
		};
		const response = await api
			.post('/api/blogs')
			.set('Authorization', `bearer ${token}`)
			.send(newBlog);
		expect(response.status).toBe(201);
		const lastBlog = await helper.lastBlog();
		//console.log(lastBlog);
		expect(lastBlog.likes).toBe(0);
	}); //4.11
	test('blog without content is not added', async () => {
		const newBlog = {
			author: 'HTML is easy',
		};
		const response = await api
			.post('/api/blogs')
			.set('Authorization', `bearer ${token}`)
			.send(newBlog);
		expect(response.status).toBe(400);

		const blogsAtEnd = await helper.blogsInDb();

		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
	}); //4.12
});
describe('Delete blog', () => {
	beforeAll(async () => {
		await User.deleteMany({});

		const passwordHash = await bcrypt.hash('password', 10);
		const user = new User({ username: 'jane', name: 'thang', passwordHash });

		await user.save();

		// Login user to get token
		await api
			.post('/api/login')
			.send({ username: 'jane', password: 'password' })
			.then((res) => {
				return (token = res.body.token);
			});

		return token;
	});
	test('delete blog with correct id', async () => {
		const newBlog = {
			title: 'HTML is easy',
			author: 'yandere 2',
			url: 'https://fullstackopen.com/en/part4/testing_the_backend#test-environment',
			likes: 7,
		};
		//console.log(token);
		const blogToDelete = await api
			.post('/api/blogs')
			.set('Authorization', `bearer ${token}`)
			.send(newBlog);
		console.log(blogToDelete.body.savedblog.id);
		await api
			.delete(`/api/blogs/${blogToDelete.body.savedblog.id}`)
			.set('Authorization', `bearer ${token}`)
			.expect(204);
	}); //4.13
}); //4.23
describe('when there is initially one user in db', () => {
	beforeEach(async () => {
		await User.deleteMany({});

		const passwordHash = await bcrypt.hash('sekret', 10);
		const user = new User({ username: 'root', name: 'root', passwordHash, blogs: [] });

		await user.save();
	});

	test('creation succeeds with a correct information', async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			username: 'mluukkai',
			name: 'Matti Luukkainen',
			password: 'salainen',
		};

		await api
			.post('/api/users')
			.send(newUser)
			.expect(200)
			.expect('Content-Type', /application\/json/);

		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

		const usernames = usersAtEnd.map((u) => u.username);
		expect(usernames).toContain(newUser.username);
	});
	test('creation fail  with missing information', async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			username: 'mluukkai',
			name: 'Matti Luukkainen',
		};

		await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/);

		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd).toHaveLength(usersAtStart.length);
	}); //4.16
	test('creation fail  with username/password length mismatch ', async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			username: 'm',
			name: 'Matti Luukkainen',
			password: 'a',
		};

		await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/);

		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd).toHaveLength(usersAtStart.length);
	}); //4.16
});
afterAll(() => {
	mongoose.connection.close();
});
