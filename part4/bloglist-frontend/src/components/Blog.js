import React from 'react';
import Togglable from './Togglable';
const Blog = ({ blog, updateLike, username, deleteBlog, index }) => {
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	};
	//console.log(blog);
	const hanldeUpdate = () => {
		let newBlog = {
			...blog,
			likes: ++blog.likes,
			user: blog.user.id,
		};

		updateLike(newBlog);
	};
	const hanldeDelete = () => {
		let confirm = window.confirm('Are you sure you want to delete this blog?');
		if (confirm) {
			deleteBlog(blog.id, index);
		}
	};
	return (
		<div style={blogStyle} data-testid='blog-content' data-cy='blog'>
			{blog.title}
			<Togglable buttonLabel='View' buttonHideLabel='Hide'>
				<div data-testid='hidden-content'>
					<div>{blog.id}</div>
					<div>{blog.url}</div>
					<div data-cy='likes'>
						{'likes: '}
						{blog.likes}{' '}
						<button data-cy='like-btn' onClick={hanldeUpdate}>
							Likes
						</button>{' '}
					</div>
					<div>
						{blog.author}{' '}
						{blog.user.username === username ? (
							<button onClick={hanldeDelete}>
								Delete
							</button>
						) : (
							''
						)}
					</div>
				</div>
			</Togglable>
			{/* 5.7 */}
		</div>
	);
};

export default Blog;
