import React, { useState } from 'react';
//5.6
const CreateBlogForm = ({ createBlog }) => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');
	const handleSubmit = (e) => {
		e.preventDefault();
		createBlog({ title, author, url });
		setTitle('');
		setAuthor('');
		setUrl('');
	};
	return (
		<div>
			<form onSubmit={(e) => handleSubmit(e)}>
				<div>
					title
					<input
						type='text'
						value={title}
						name='title'
						title='title'
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author
					<input
						value={author}
						name='author'
						title='author'
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					url
					<input
						value={url}
						name='url'
						title='url'
						onChange={({ target }) => setUrl(target.value)}
					/>
				</div>
				<button type='submit'>Create</button>
			</form>
		</div>
	);
};

export default CreateBlogForm;
