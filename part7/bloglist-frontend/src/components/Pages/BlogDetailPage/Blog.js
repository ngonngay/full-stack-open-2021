import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { updateLike, deleteBlog, initializeBlogs } from '../../../reducers/blogReducer';
import { setNotification } from '../../../reducers/notificationReducer';
import CommentForm from './CommentForm';

const Blog = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		dispatch(initializeBlogs());
	}, []);
	const blogs = useSelector((state) => state.blogs);
	const user = useSelector((state) => state.loggedUser);
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 10,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	};
	const match = useRouteMatch('/blog/:id');
	//console.log(match.params.id);
	const blog = match ? blogs?.find((blog) => blog.id === match.params.id) : null;
	console.log(blogs);
	if (!blog) {
		return <div>loading...</div>;
	}
	const hanldeDelete = () => {
		let confirm = window.confirm('Are you sure you want to delete this blog?');
		if (confirm) {
			dispatch(deleteBlog(blog));
			dispatch(
				setNotification(
					{ message: `The '${blog.title}' was deleted`, type: 'error' },
					5,
					dispatch,
				),
			);
			history.push('/');
		}
	};
	const hanldeUpdateLike = async () => {
		let newBlog = {
			...blog,
			likes: ++blog.likes,
			user: blog.user.id,
		};

		dispatch(updateLike(newBlog));
		dispatch(
			setNotification(
				{ message: `You like  '${blog.title}' ! `, type: 'success' },
				5,
				dispatch,
			),
		);
	};

	return (
		<>
			<div style={blogStyle} data-testid='blog-content' data-cy='blog'>
				{blog.title}
				<div data-testid='hidden-content'>
					<div>{blog.id}</div>
					<div>{blog.url}</div>
					<div data-cy='likes'>
						{'likes: '}
						{blog.likes}{' '}
						<button data-cy='like-btn' onClick={hanldeUpdateLike}>
							Likes
						</button>{' '}
					</div>
					<div>
						{blog.author}{' '}
						{blog.user.username === user.username ? (
							<button onClick={hanldeDelete}>Delete</button>
						) : (
							''
						)}
					</div>
				</div>
			</div>
			<br />
			<CommentForm blogStyle={blogStyle} comments={blog.comments} id={blog.id} />
		</>
	);
};

export default Blog;
