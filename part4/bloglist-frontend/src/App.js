import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import CreateBlogForm from './components/CreateBlogForm';
import Notification from './components/Notification';
import './index.css';
import Togglable from './components/Togglable';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);
	const [message, setMessage] = useState({});
	useEffect(() => {
		blogService
			.getAll()
			.then((blogs) => setBlogs(blogs.sort((a, b) => -(a.likes - b.likes))));
	}, []);
	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
		}
	}, []);
	const blogTogglableRef = useRef();
	const handleLogin = (user) => {
		if (user) {
			setUser(user);
			setMessage({
				message: 'Login successful',
				type: 'success',
			});
			setTimeout(() => {
				setMessage({});
			}, 3000);
			window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
		} else {
			setMessage({
				message: 'wrong username or password',
				type: 'error',
			});
			setTimeout(() => {
				setMessage({});
			}, 3000);
		}
	};
	const handleLogout = () => {
		window.localStorage.removeItem('loggedNoteappUser');
		setUser(null);
	};
	const loginForm = () => {
		return (
			<div>
				<LoginForm handleLogin={handleLogin} />
			</div>
		);
	};
	const createBlog = async (blog) => {
		blogService.setToken(user.token);
		try {
			const response = await blogService.create(blog);
			console.log(response);
			setMessage({
				message: `a new blog "${response.savedblog.title}" was created by ${user.name}`,
				type: 'success',
			});
			setTimeout(() => {
				setMessage({});
			}, 3000);
			blogTogglableRef.current(); //5.5
			setBlogs(
				blogs
					.concat(response.savedblog)
					.sort((a, b) => -(a.likes - b.likes)),
			); //5.9
		} catch (error) {
			console.log(error);
		}
	};
	const updateLike = async (blog) => {
		blogService.setToken(user.token);
		try {
			const response = await blogService.update(blog.id, blog);
			if (response.succeed) {
				console.log('updated');

				setBlogs(
					blogs
						.map((blog) => {
							if (blog.id === response.result.id) {
								return {
									...blog,
									likes: response.result
										.likes,
								};
							} else {
								return blog;
							}
						})
						.sort((a, b) => -(a.likes - b.likes)),
				);
			}
		} catch (error) {
			console.log(error);
		}
	}; //5.8
	const deleteBlog = async (blogId) => {
		blogService.setToken(user.token);
		try {
			await blogService.deleteBlog(blogId);

			setBlogs(
				blogs
					.filter((blog) => blog.id !== blogId)
					.sort((a, b) => -(a.likes - b.likes)),
			);
		} catch (error) {
			console.log(error);
		}
	}; //5.10
	const blogArea = () => {
		return (
			<>
				<Togglable buttonLabel='Create new blog' ref={blogTogglableRef}>
					<CreateBlogForm createBlog={createBlog} />
				</Togglable>
				<br />
				{blogs.map((blog) => (
					<Blog
						key={blog.id}
						blog={blog}
						updateLike={updateLike}
						deleteBlog={deleteBlog}
						username={user.username}
					/>
				))}
			</>
		);
	};
	return (
		<div>
			<h2>blogs</h2>
			<Notification message={message} />
			{user === null ? (
				loginForm()
			) : (
				<div>
					<p>
						{user.name} logged-in{' '}
						<button onClick={() => handleLogout()}>
							Logout
						</button>
					</p>
					{blogArea()}
				</div>
			)}
		</div>
	);
};

export default App;
