import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const BlogList = () => {
	const blogs = useSelector((state) => state.blogs);
	return (
		<div>
			{blogs.map((blog) => (
				<div key={blog.id}>
					<Link to={`/blog/${blog.id}`}>{blog.title}</Link>
					<br />
				</div>

				//<Blog key={blog.id} blog={blog} />
			))}
		</div>
	);
};

export default BlogList;
