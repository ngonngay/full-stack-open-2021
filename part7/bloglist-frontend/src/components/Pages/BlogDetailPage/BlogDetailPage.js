import React from 'react';
import Blog from './Blog';

const BlogDetailPage = (props) => {
	const { blog } = props;
	return (
		<div>
			<Blog blog={blog} />
		</div>
	);
};

export default BlogDetailPage;
